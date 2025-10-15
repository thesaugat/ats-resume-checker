import uuid
from typing import List, Dict, Any
import re
import os
import shutil
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOpenAI
from langchain_community.llms import OpenAI
from langchain.schema import Document, AIMessage, HumanMessage, SystemMessage
from langchain.prompts import ChatPromptTemplate
import chromadb
from chromadb.config import Settings

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
    # def _create_vectorstore(self, chunks: List[Document], store_name: str):
    #     ids = [str(uuid.uuid5(uuid.NAMESPACE_DNS, doc.page_content)) for doc in chunks]

    #     unique_ids = set()
    #     unique_chunks = []
    #     final_ids = []
    #     for doc, id in zip(chunks, ids):
    #         if id not in unique_ids:
    #             unique_ids.add(id)
    #             unique_chunks.append(doc)
    #             final_ids.append(id)

    #     persist_dir = f"{self.vectorstore_path}/{store_name}"

    #     # ✅ Delete existing directory if it exists
    #     if os.path.exists(persist_dir):
    #         shutil.rmtree(persist_dir)

    #     vectorstore = Chroma.from_documents(
    #         documents=unique_chunks,
    #         ids=final_ids,
    #         embedding=self.embeddings,
    #         persist_directory=persist_dir,
    #     )
    #     vectorstore.persist()
    #     return vectorstore

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

        # Use absolute path
        persist_dir = "/app/vector_store"  # Changed from "./vector_store"

        # Ensure directory exists
        os.makedirs(persist_dir, exist_ok=True)

        # Create persistent client
        chroma_client = chromadb.PersistentClient(path=persist_dir)

        # Try to delete existing collection if it exists
        try:
            chroma_client.delete_collection(name=store_name)
        except Exception:
            pass  # Collection doesn't exist, that's fine

        # Create vectorstore
        vectorstore = Chroma.from_documents(
            documents=unique_chunks,
            ids=final_ids,
            embedding=self.embeddings,
            client=chroma_client,
            collection_name=store_name,
        )

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
    def extract_resume_details(self):
        """Extracts structured information from the resume."""
        retriever = self.resume_vectorstore.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm, retriever=retriever, return_source_documents=True
        )

        prompt = (
            "You are an expert resume parser and career coach. "
            "Extract structured, machine-readable data from the retrieved resume chunks.\n\n"
            "Your goal is to identify all important sections and extract detailed information for later comparison with job descriptions.\n"
            "Extract the following fields:\n"
            "- name\n"
            "- title\n"
            "- total experience in years\n"
            "- location\n"
            "- summary: a 3-4 sentence summary or professional headline if available.\n"
            "- skills: list up to 12 concise, keyword-level items highlighting core technologies, tools, or professional strengths.\n"
            "- work_experience: a list of roles, each with\n"
            "   * company\n"
            "   * position\n"
            "   * duration (in months or years)\n"
            "   * key_responsibilities (list of 3–6 bullet points)\n"
            "   * technologies_used (list of key tools or frameworks)\n"
            "- projects: a list of notable projects with\n"
            "   * project_name\n"
            "   * description\n"
            "   * technologies_used\n"
            "   * role or contribution\n"
            "- education: a list of degrees or certifications with\n"
            "   * degree\n"
            "   * institution\n"
            "   * year_completed\n"
            "- certifications: a list of certifications or courses (e.g., 'AWS Certified Developer', 'Google Data Analytics').\n"
            "- achievements: optional — any key accomplishments or awards.\n"
            "- soft_skills: a list of interpersonal or general skills (e.g., 'Leadership', 'Collaboration', 'Problem Solving').\n\n"
            "Return only valid JSON in this format:\n"
            "{\n"
            "  'name': '',\n"
            "  'title': '',\n"
            "  'experience': '',\n"
            "  'location': '',\n"
            "  'summary': '',\n"
            "  'skills': [],\n"
            "  'work_experience': [],\n"
            "  'projects': [],\n"
            "  'education': [],\n"
            "  'certifications': [],\n"
            "  'achievements': [],\n"
            "  'soft_skills': []\n"
            "}"
        )

        result = qa_chain.invoke({"query": prompt})
        return result

    def extract_job_details(self):
        """Extracts structured information from the job description."""
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
            "- requiredSkills: extract ~12 concise, keyword-level essential skills (technologies, tools, or core competencies) relevant to the job\n"
            "- skillRelevance: assign 1–5 to each skill in 'requiredSkills' based on importance (5 = core, 3 = moderate, 1 = optional).\n"
            "- keyFocusAreas: identify 5–10 core themes summarizing the job's main goals or specializations\n"
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

        return result

    def extract_all_details(self):
        """Combines both resume and job extraction into a single dictionary."""
        self._create_all_vectorstores()
        resume_details = self.extract_resume_details()
        job_details = self.extract_job_details()

        return {
            "resume": resume_details,
            "job": job_details,
        }


class ResumeAnalyzer:

    def __init__(self, resume_json, job_json, llm):
        self.resume_json = resume_json
        self.job_json = job_json
        self.llm = llm

    def _analyze_resume_match_prompt(self, resume_json, job_json):
        """
        Generates a prompt to analyze a resume against a job description,
        returning structured metrics, competency analysis, keyword distribution,
        and recommendations.
        """

        prompt = f"""
            You are an expert ATS (Applicant Tracking System) analyzer. Compare the following resume against the job description and provide a detailed analysis.

            RESUME DATA:
            {json.dumps(resume_json, indent=2)}

            JOB DESCRIPTION DATA:
            {json.dumps(job_json, indent=2)}

            Analyze the resume against the job requirements and provide ONLY valid JSON using the following structure (exactly as shown):

            {{
            "performance_metrics": {{
                "match_score": <0-100>,
                "ats_score": <0-100>,
                "skills_score": <0-100>,
                "experience_score": <0-100>
            }},
            "competency": [
                {{
                "skill": "Five Dynamic skill based on job's industry standard to calculate competency analysis (e.g., Technical Skills, Leadership, Communication)",
                "yours": <0-100>,
                "required": <0-100>,
              
                }}
            ],
            "detailed_analysis": {{
                "skills_matched": ["skill1", "skill2"], 
                "skills_missing": ["skill1", "skill2"],
                "missing_skills_priority": [1, 2],  # 1=High, 2=Medium, 3=Low
                "experience_relevance": {{
                "years_required": <number or "not specified">,
                "years_candidate_has": <number>,
                "relevance_explanation": "Brief explanation"
                }},
                "keyword_density": {{
                "critical_keywords_present": ["keyword1", "keyword2"],
                "critical_keywords_missing": ["keyword1", "keyword2"]
                }},
                "keywords": [
                {{
                    "section": "Summary",
                    "matched": <number of keywords matched in this section>,
                    "missing": <number of keywords missing in this section>
                }},
                {{
                    "section": "Skills",
                    "matched": <number>,
                    "missing": <number>
                }},
                {{
                    "section": "Experience",
                    "matched": <number>,
                    "missing": <number>
                }},
                {{
                    "section": "Projects",
                    "matched": <number>,
                    "missing": <number>
                }},
                {{
                    "section": "Education",
                    "matched": <number>,
                    "missing": <number>
                }}
                ]
            }},
            "recommendations": [
                {{
                "type": "critical|high|medium|low",
                "title": "Clear actionable title",
                "description": "Detailed explanation of what to do",
                "impact": "High|Medium|Low",
                "section": "Skills|Experience|Projects|Summary|Education",
                "original": "Current content (if applicable)",
                "suggested": "Recommended content (if applicable)",
                "action": "add|modify|remove|reorder"
                }}
            ],
            "strengths": [
                "List of strong points in the resume"
            ],
            "red_flags": [
                "Any concerns or issues"
            ]
            }}

            SCORING GUIDELINES:
            1. **Match Score (0-100)**: Overall compatibility between resume and job
            - Consider skills overlap, semantic similarity of skills, experience relevance, and keyword presence
            - Weight: 40% skills, 35% experience, 25% keywords

            2. **ATS Score (0-100)**: Resume performance in automated systems
            - Keyword density and placement
            - Section organization and completeness
            - Assume good formatting based on JSON structure

            3. **Skills Score (0-100)**: Alignment of technical and soft skills
            - Direct skill matches: +10 points each (max 70)
            - Related/transferable skills or synonyms: +5 points each (max 20)
            - Soft skills alignment: +10 points (max 10)

            4. **Experience Score (0-100)**: Work experience relevance
            - Years of experience match: 30 points
            - Relevant job titles/roles: 30 points
            - Project complexity and relevance: 25 points
            - Industry/domain match: 15 points

            RECOMMENDATION PRIORITIES:
            - **Critical**: Missing must-have requirements that could lead to rejection
            - **High**: Important optimizations that significantly improve match
            - **Medium**: Good-to-have improvements
            - **Low**: Minor tweaks for polish

            Focus on:
            1. Missing critical skills from requiredSkills with high skillRelevance (4-5)
            2. Include missing_skills_priority for each missing skill
            3. Keyword optimization per resume section (Summary, Skills, Experience, Projects, Education)
            4. Experience gaps or misalignments
            5. ATS-unfriendly elements
            6. Quantifiable achievements or metrics that could be added

            Always consider:
            - Synonyms or related technologies when evaluating skills
            - Transferable skills if domain differs
            - Include all matching skills from the resume and job description, and rename them to match the job's wording.
            - Dynamic competency categories based on job type
            - Experience relevance even if job description is generic
            - Include only content from the resume; do not include projects if they are explicitly listed as separate sections

            Return ONLY valid JSON, with the exact structure above, and do not include any extra text.
            """
        return prompt

    def analyze_resume(self):
        system_message = (
            "You are an expert ATS analyzer. Always respond with valid JSON only."
        )
        user_message = self._analyze_resume_match_prompt(
            resume_json=self.resume_json, job_json=self.job_json
        )  # your variable containing the prompt

        # Create LangChain messages
        messages = [
            SystemMessage(content=system_message),
            HumanMessage(content=user_message),
        ]

        # Run the LLM
        response = self.llm.invoke(messages)
        return response
