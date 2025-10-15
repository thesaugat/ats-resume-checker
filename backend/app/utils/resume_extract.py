class ResumeJobExtractor:
    def __init__(self, llm, resume_vectorstore, job_vectorstore):
        self.llm = llm
        self.resume_vectorstore = resume_vectorstore
        self.job_vectorstore = job_vectorstore

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
            "- summary: a 1-2 sentence summary or professional headline if available.\n"
            "- skills: up to 20 concise, keyword-level skills (e.g., 'Python', 'React', 'Docker', 'Flutter').\n"
            "- skills_category: a parallel list for 'skills' with relevant categories (e.g., 'Mobile', 'Backend', 'DevOps', 'Cloud', 'Testing').\n"
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
            "  'skills_category': [],\n"
            "  'work_experience': [],\n"
            "  'projects': [],\n"
            "  'education': [],\n"
            "  'certifications': [],\n"
            "  'achievements': [],\n"
            "  'soft_skills': []\n"
            "}"
        )

        result = qa_chain.invoke({"query": prompt})
        # try:
        #     details = json.loads(result["result"])
        # except json.JSONDecodeError:
        #     details = {
        #         "name": "",
        #         "title": "",
        #         "experience": "",
        #         "location": "",
        #         "skills": [],
        #     }
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
        # try:
        #     details = json.loads(result["result"])
        # except json.JSONDecodeError:
        #     details = {
        #         "title": "",
        #         "company": "",
        #         "location": "",
        #         "type": "",
        #         "postedDate": "",
        #         "requiredSkills": [],
        #     }
        return result

    def extract_all_details(self) -> Dict[str, dict]:
        """Combines both resume and job extraction into a single dictionary."""
        resume_details = self.extract_resume_details()
        job_details = self.extract_job_details()

        return {
            "resume": resume_details,
            "job": job_details,
        }
