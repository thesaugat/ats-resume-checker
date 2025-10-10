import uuid
from typing import List, Dict, Any
import re
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.schema import Document
import json


class RAGAnalyzerFull:
    def __init__(
        self,
        resume_text: str,
        job_desc: str,
        vectorstore_path: str,
        openai_api_key: str,
    ):
        self.resume_text = resume_text
        self.job_desc = job_desc
        self.vectorstore_path = vectorstore_path

        # Initialize embeddings and LLM
        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-ada-002", openai_api_key=openai_api_key
        )
        self.llm = ChatOpenAI(
            model_name="gpt-4o-mini", temperature=0, openai_api_key=openai_api_key
        )

        # Separate vectorstores
        self.resume_vectorstore = None
        self.job_vectorstore = None

    # -------------------------------
    # Step 1: Clean text
    # -------------------------------
    def _clean_text(self, text: str) -> str:
        text = re.sub(r"\s+", " ", text)
        return text.strip()

    # -------------------------------
    # Step 2: Chunk text
    # -------------------------------
    def _chunk_text(
        self, text: str, chunk_size: int = 500, overlap: int = 50
    ) -> List[Document]:
        words = text.split()
        chunks = []
        start = 0
        while start < len(words):
            end = min(start + chunk_size, len(words))
            chunk_text = " ".join(words[start:end])
            chunks.append(Document(page_content=chunk_text))
            start += chunk_size - overlap
        return chunks

    # -------------------------------
    # Step 3: Create separate vectorstores
    # -------------------------------
    def _create_vectorstore(self, chunks: List[Document], store_name: str):
        ids = [str(uuid.uuid5(uuid.NAMESPACE_DNS, doc.page_content)) for doc in chunks]

        unique_ids = set()
        unique_chunks = []
        final_ids = []
        for doc, id in zip(chunks, ids):
            if id not in unique_ids:
                unique_ids.add(id)
                unique_chunks.append(doc)
                final_ids.append(id)

        persist_dir = f"{self.vectorstore_path}/{store_name}"
        vectorstore = Chroma.from_documents(
            documents=unique_chunks,
            ids=final_ids,
            embedding=self.embeddings,
            persist_directory=persist_dir,
        )
        vectorstore.persist()
        return vectorstore

    def _create_all_vectorstores(self):
        # Clean & chunk texts
        resume_chunks = self._chunk_text(self._clean_text(self.resume_text))
        job_chunks = self._chunk_text(self._clean_text(self.job_desc))

        # Create two separate vectorstores
        self.resume_vectorstore = self._create_vectorstore(
            resume_chunks, "resume_store"
        )
        self.job_vectorstore = self._create_vectorstore(job_chunks, "job_store")

    # -------------------------------
    # Step 4: Extract structured details (separate for resume & job)
    # -------------------------------
    def extract_resume_details(self) -> dict:
        retriever = self.resume_vectorstore.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm, retriever=retriever, return_source_documents=True
        )

        prompt = (
            "You are an expert resume parser. "
            "Extract the following details from the retrieved resume chunks:\n"
            "- name\n"
            "- title\n"
            "- total experience in years\n"
            "- location\n"
            "- skills: extract a maximum of 20 concise, keyword-level skills from the resume. "
            "Each skill should be a single term or short phrase (e.g., 'Python', 'React', 'Docker', 'Flutter'). "
            "Prioritize technical and domain-specific skills, but include important general skills if present.\n"
            "- skills_category: a parallel list to 'skills', where each skill is assigned a category. "
            "Use a maximum of 5 unique categories per resume. "
            "Examples include 'Mobile', 'Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Testing'. "
            "Adapt categories according to the candidate's profile and profession.\n\n"
            "Return only valid JSON in the following format:\n"
            "{\n"
            "  'name': '',\n"
            "  'title': '',\n"
            "  'experience': '',\n"
            "  'location': '',\n"
            "  'skills': [],\n"
            "  'skills_category': []\n"
            "}"
        )

        result = qa_chain.run(prompt)
        try:
            return json.loads(result)
        except json.JSONDecodeError:
            return {
                "name": "",
                "title": "",
                "experience": "",
                "location": "",
                "skills": [],
            }

    def extract_job_details(self) -> dict:
        retriever = self.job_vectorstore.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm, retriever=retriever, return_source_documents=True
        )

        prompt = (
            "You are an HR assistant that analyses job description text and structures it into clean, machine-readable JSON.\n"
            "From the retrieved job description chunks, extract the following details:\n"
            "- title\n"
            "- company\n"
            "- location\n"
            "- employment type (Full-time, Part-time, Contract, Internship, or Freelance)\n"
            "- posted date (if mentioned)\n"
            "- requiredSkills: extract about 15 only concise, keyword-level skills such as 'Python', 'React', 'Snow Flake', which are very essential for this job, not full phrases or sentences and try to prioritise technological terminology like 'docker', 'aws', but include other common skills too.\n"
            "- skillRelevance: a parallel list where each value corresponds to the relevance or importance (1–5) of the skill at the same index in 'requiredSkills'. "
            "Use 5 for critical/core skills frequently mentioned, 3 for moderately important, and 1 for nice-to-have or optional.\n"
            "- keyFocusAreas: identify 5-10 core themes or focus areas that summarize the main goals or specializations of this job "
            "(e.g., 'Frontend Development', 'Cloud Infrastructure', 'Data Engineering', 'Team Leadership').\n\n"
            "Return only valid JSON in the following format:\n"
            "{\n"
            "  'title': '',\n"
            "  'company': '',\n"
            "  'location': '',\n"
            "  'type': '',\n"
            "  'postedDate': '',\n"
            "  'requiredSkills': [],\n"
            "  'skillRelevance': [],\n"
            "  'keyFocusAreas': []\n"
            "}\n"
        )
        result = qa_chain.invoke({"query": prompt})
        try:
            return json.loads(result)
        except json.JSONDecodeError:
            return {
                "title": "",
                "company": "",
                "location": "",
                "type": "",
                "postedDate": "",
                "requiredSkills": [],
            }

    def analyze_match(self, resume_result, job_result):
        resume_skills = {
            s.lower().replace("(", "").replace(")", "").strip()
            for s in resume_result["skills"]
        }
        job_skills = [s.lower().strip() for s in job_result["requiredSkills"]]
        relevance = job_result["skillRelevance"]

        matched = []
        missing = []
        weighted_score = 0
        total_weight = 0

        for skill, weight in zip(job_skills, relevance):
            total_weight += weight
            if skill in resume_skills:
                matched.append(skill)
                weighted_score += weight
            else:
                missing.append(skill)

        match_percentage = (
            (weighted_score / total_weight) * 100 if total_weight > 0 else 0
        )

        return {
            "matchedSkills": matched,
            "missingSkills": missing,
            "weightedMatchScore": round(match_percentage, 2),
        }

    # -------------------------------
    # Step 5: Analyze matched/missing skills
    # -------------------------------
    def analyze(self, resume_details: dict, job_details: dict) -> Dict[str, Any]:
        prompt = f"""
        Compare the resume and job description details and produce the following:
        1. matchedSkills (list of strings)
        2. missingSkills (list of strings)
        3. 3-5 recommendations (type: 'critical'|'important'|'moderate'|'info', impact: 'High'|'Medium'|'Low', title, description)
        4. 3-5 suggestions per section (Skills, Work Experience, Projects) with section, original, suggested, action (add/enhance)
        Return as JSON with keys: matchedSkills, missingSkills, recommendations, suggestions.
        Resume Details: {json.dumps(resume_details)}
        Job Details: {json.dumps(job_details)}
        """

        result = self.llm.predict(prompt)
        try:
            return json.loads(result)
        except json.JSONDecodeError:
            return {
                "matchedSkills": [],
                "missingSkills": [],
                "recommendations": [],
                "suggestions": [],
            }

    # -------------------------------
    # Step 6: Generate final JSON
    # -------------------------------
    def generate_final_json(self) -> dict:
        # Create separate vectorstores
        self._create_all_vectorstores()

        # Extract structured details
        resume_details = self.extract_resume_details()
        job_details = self.extract_job_details()

        # Analyze
        analysis = self.analyze(resume_details, job_details)

        # Combine into final output
        return {
            "resume": resume_details,
            "job": job_details,
            "analysis": analysis,
            "charts": {},  # placeholder for visual insights
        }


class ResumeJobExtractor:
    def __init__(self, llm, resume_vectorstore, job_vectorstore):
        self.llm = llm
        self.resume_vectorstore = resume_vectorstore
        self.job_vectorstore = job_vectorstore

    def extract_resume_details(self) -> dict:
        """Extracts structured information from the resume."""
        retriever = self.resume_vectorstore.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm, retriever=retriever, return_source_documents=True
        )

        prompt = (
            "You are an expert resume parser. "
            "Extract the following details from the retrieved resume chunks:\n"
            "name, title, total experience in years, location, and skills (list of strings).\n"
            "Return only JSON in this format:\n"
            "{\n"
            "  'name': '',\n"
            "  'title': '',\n"
            "  'experience': '',\n"
            "  'location': '',\n"
            "  'skills': []\n"
            "}"
        )

        result = qa_chain.invoke({"query": prompt})
        try:
            details = json.loads(result["result"])
        except json.JSONDecodeError:
            details = {
                "name": "",
                "title": "",
                "experience": "",
                "location": "",
                "skills": [],
            }
        return details

    def extract_job_details(self) -> dict:
        """Extracts structured information from the job description."""
        retriever = self.job_vectorstore.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm, retriever=retriever, return_source_documents=True
        )

        # prompt = (
        #     "You are an HR assistant. "
        #     "Extract the following details from the retrieved job description chunks:\n"
        #     "title, company, location, employment type (Full-time, Part-time, Contract), "
        #     "posted date, and required skills (list of strings).\n"
        #     "Return only JSON in this format:\n"
        #     "{\n"
        #     "  'title': '',\n"
        #     "  'company': '',\n"
        #     "  'location': '',\n"
        #     "  'type': '',\n"
        #     "  'postedDate': '',\n"
        #     "  'requiredSkills': []\n"
        #     "}"
        # )

        prompt = (
            "You are an HR assistant that analyses job description text and structures it into clean, machine-readable JSON.\n"
            "From the retrieved job description chunks, extract the following details:\n"
            "- title\n"
            "- company\n"
            "- location\n"
            "- employment type (Full-time, Part-time, Contract, Internship, or Freelance)\n"
            "- posted date (if mentioned)\n"
            "- requiredSkills: extract about 15 only concise, keyword-level skills such as 'Python', 'React', 'Snow Flake', which are very essential for this job, not full phrases or sentences and try to prioritise technological terminology like 'docker', 'aws', but include other common skills too.\n"
            "- skillRelevance: a parallel list where each value corresponds to the relevance or importance (1–5) of the skill at the same index in 'requiredSkills'. "
            "Use 5 for critical/core skills frequently mentioned, 3 for moderately important, and 1 for nice-to-have or optional.\n"
            "- keyFocusAreas: identify 5-10 core themes or focus areas that summarize the main goals or specializations of this job "
            "(e.g., 'Frontend Development', 'Cloud Infrastructure', 'Data Engineering', 'Team Leadership').\n\n"
            "Return only valid JSON in the following format:\n"
            "{\n"
            "  'title': '',\n"
            "  'company': '',\n"
            "  'location': '',\n"
            "  'type': '',\n"
            "  'postedDate': '',\n"
            "  'requiredSkills': [],\n"
            "  'skillRelevance': [],\n"
            "  'keyFocusAreas': []\n"
            "}\n"
        )
        result = qa_chain.invoke({"query": prompt})
        try:
            details = json.loads(result["result"])
        except json.JSONDecodeError:
            details = {
                "title": "",
                "company": "",
                "location": "",
                "type": "",
                "postedDate": "",
                "requiredSkills": [],
            }
        return details

    def extract_all_details(self) -> Dict[str, dict]:
        """Combines both resume and job extraction into a single dictionary."""
        resume_details = self.extract_resume_details()
        job_details = self.extract_job_details()

        return {
            "resume": resume_details,
            "job": job_details,
        }


class MatchUtils:
    @staticmethod
    def analyze_match(resume_result, job_result):
        """
        Analyze skill overlap between resume and job description.
        Returns matched skills, missing skills, and weighted match score (%).
        """
        resume_skills = {
            s.lower().replace("(", "").replace(")", "").strip()
            for s in resume_result.get("skills", [])
        }
        job_skills = [s.lower().strip() for s in job_result.get("requiredSkills", [])]
        relevance = job_result.get("skillRelevance", [])

        matched = []
        missing = []
        weighted_score = 0
        total_weight = 0

        for skill, weight in zip(job_skills, relevance):
            total_weight += weight
            if skill in resume_skills:
                matched.append(skill)
                weighted_score += weight
            else:
                missing.append(skill)

        match_percentage = (
            (weighted_score / total_weight) * 100 if total_weight > 0 else 0
        )

        return {
            "matchedSkills": matched,
            "missingSkills": missing,
            "weightedMatchScore": round(match_percentage, 2),
        }

    # ----------------- Experience Match -----------------
    @staticmethod
    def calculate_experience_score(resume_exp, job_title):
        """
        Calculates experience match percentage based on job level and resume experience.
        """
        try:
            resume_exp = float(resume_exp)
        except (ValueError, TypeError):
            return 0

        title = job_title.lower()
        if "graduate" in title or "intern" in title:
            expected = 0
        elif "junior" in title or "associate" in title:
            expected = 2
        elif "senior" in title or "lead" in title:
            expected = 6
        else:
            expected = 3  # Default mid-level

        diff = abs(resume_exp - expected)
        score = max(0, 100 - (diff * 15))  # 15 points off per year difference
        return round(min(score, 100), 2)

    # ----------------- ATS Score -----------------
    @staticmethod
    def calculate_ats_score(resume_result):
        """
        Simulates an ATS score based on completeness and skill diversity.
        """
        score = 0
        total_checks = 3  # title, location, experience

        if resume_result.get("title"):
            score += 1
        if resume_result.get("location"):
            score += 1
        if resume_result.get("experience"):
            score += 1

        # Bonus for skill diversity
        unique_categories = len(set(resume_result.get("skills_category", [])))
        diversity_score = min(unique_categories, 5) / 5  # 0–1
        score += diversity_score

        return round((score / (total_checks + 1)) * 100, 2)

    # ----------------- Overall Summary -----------------
    @staticmethod
    def calculate_match_summary(resume_result, job_result):
        """
        Combines skill match, experience, and ATS scores into an overall match score.
        """
        skill_match_data = MatchUtils.analyze_match(resume_result, job_result)
        skills_score = skill_match_data["weightedMatchScore"]
        experience_score = MatchUtils.calculate_experience_score(
            resume_result.get("experience", 0), job_result.get("title", "")
        )
        ats_score = MatchUtils.calculate_ats_score(resume_result)

        # Weighted combination
        overall_match = round(
            (skills_score * 0.6) + (experience_score * 0.3) + (ats_score * 0.1), 2
        )

        return {
            "skillsMatch": f"{skills_score}%",
            "experienceMatch": f"{experience_score}%",
            "atsScore": f"{ats_score}%",
            "overallMatchScore": f"{overall_match}%",
            "matchedSkills": skill_match_data["matchedSkills"],
            "missingSkills": skill_match_data["missingSkills"],
        }
