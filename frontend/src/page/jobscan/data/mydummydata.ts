// data/myDummyData.ts
import { ResponseData } from './data';

export const myDummyData: ResponseData = {
    resume: {
        name: "Saugat Timilsina",
        title: "Data Engineer | Cloud & Analytics Specialist",
        experience: "6+ years",
        location: "Wollongong, NSW, Australia",
        summary:
            "Results-driven Data Engineer with 6+ years of experience in data pipelines, analytics, and full-stack software development. Passionate about transforming raw data into reliable, high-impact insights. Experienced in building scalable ETL/ELT pipelines, automating workflows, and implementing cloud-native data solutions. Strong background in Python, SQL, and AWS with hands-on experience in Big Data, API integrations, and ML model deployment.",
        skills: [
            "Data Engineering",
            "ETL/ELT Pipelines",
            "Python",
            "SQL",
            "Apache Airflow",
            "AWS (Lambda, S3, Redshift)",
            "Docker",
            "Data Warehousing",
            "Power BI",
            "Machine Learning",
            "Pandas",
            "PostgreSQL",
            "GitHub Actions"
        ],
        work_experience: [
            {
                company: "Virtual Technology PVT LTD",
                position: "Data Engineer / Full Stack Developer",
                duration: "5 years 10 months",
                key_responsibilities: [
                    "Built and maintained automated ETL pipelines integrating government data APIs and cloud data lakes.",
                    "Transformed raw JSON and CSV datasets into structured PostgreSQL and Redshift tables for analytics dashboards.",
                    "Designed RESTful APIs and backend microservices to streamline data access for BI teams.",
                    "Collaborated with analysts to improve data validation and reporting efficiency, reducing manual errors by 40%."
                ],
                technologies_used: ["Python", "PostgreSQL", "Airflow", "AWS Lambda", "APIs", "Docker"]
            },
            {
                company: "PU Assist (Side Project)",
                position: "Founder & Data Platform Engineer",
                duration: "8 years",
                key_responsibilities: [
                    "Designed data pipelines to process 10K+ daily app usage logs for analytics and performance monitoring.",
                    "Integrated Firebase, REST APIs, and Google Cloud Functions for data collection and transformation.",
                    "Deployed CI/CD pipelines using Docker and GitHub Actions for seamless app and data service updates.",
                    "Developed internal analytics dashboards for monitoring user retention and engagement trends."
                ],
                technologies_used: ["Python", "Firebase", "Google Cloud", "Docker", "GitHub Actions"]
            },
            {
                company: "Star Phones PTY LTD",
                position: "Data and IT Support Assistant",
                duration: "Part-time",
                key_responsibilities: [
                    "Prepared weekly business reports by cleansing and reconciling sales and inventory data.",
                    "Automated data validation scripts in Excel and Python to streamline reporting workflows.",
                    "Supported networking, POS, and cloud backup systems for data reliability."
                ],
                technologies_used: ["Excel", "Python", "O365"]
            },
            {
                company: "Pokhara Engineering College",
                position: "Part-time Lecturer",
                duration: "2 years 8 months",
                key_responsibilities: [
                    "Taught Python, SQL, and data visualization fundamentals to computer engineering students.",
                    "Mentored final-year projects integrating APIs, analytics, and backend development."
                ],
                technologies_used: ["Python", "SQL", "Firebase"]
            },
            {
                company: "Metashrine Pvt Ltd",
                position: "Junior Software Developer",
                duration: "1 year 3 months",
                key_responsibilities: [
                    "Developed REST APIs for restaurant management systems with Java MVC.",
                    "Integrated data synchronization between client and server modules."
                ],
                technologies_used: ["Java", "MVC", "MySQL"]
            }
        ],
        projects: [
            {
                project_name: "DataOps Pipeline Automation",
                description:
                    "Developed an automated ETL system to ingest and transform CSV and JSON datasets from multiple APIs into Redshift. Implemented Airflow DAGs for scheduling and monitoring.",
                technologies_used: ["Airflow", "AWS", "Redshift", "Python"],
                role_or_contribution: "Lead Engineer"
            },
            {
                project_name: "RAG-Based Research Assistant",
                description:
                    "Created an LLM-powered system integrating vector databases for document summarization and semantic retrieval, leveraging embeddings and LangChain pipelines.",
                technologies_used: ["LangChain", "ChromaDB", "FastAPI", "ETL"],
                role_or_contribution: "ML Engineer"
            },
            {
                project_name: "PU Assist Analytics Dashboard",
                description:
                    "Built internal analytics dashboards using Power BI and Python scripts to visualize app growth, churn, and session data.",
                technologies_used: ["Power BI", "Python", "Firebase", "ETL"],
                role_or_contribution: "Developer"
            }
        ],
        education: [
            {
                degree: "Master of Computer Science (Big Data & Machine Learning)",
                institution: "University of Wollongong, Australia",
                year_completed: "2025"
            },
            {
                degree: "Bachelor of Computer Engineering",
                institution: "Pokhara Engineering College, Nepal",
                year_completed: "2018"
            }
        ],
        certifications: [
            "AWS Certified Data Engineer – Associate (in progress)",
            "Microsoft Power BI Analyst Certification"
        ],
        achievements: [
            "Winner – Software Engineering Competition",
            "Implemented first internal ETL automation system at Virtual Technology reducing reporting time by 50%"
        ],
        soft_skills: [
            "Analytical Thinking",
            "Problem Solving",
            "Collaboration",
            "Stakeholder Communication",
            "Attention to Detail"
        ]
    },
    job: {
        title: "Graduate Data Engineer",
        company: "ABZ Inc.",
        location: "Sydney, NSW",
        type: "Full-time",
        postedDate: "1 week ago",
        requiredSkills: [
            "Data Engineering",
            "Python",
            "SQL",
            "ETL Pipelines",
            "AWS Redshift",
            "Airflow",
            "Data Modelling",
            "Power BI",
            "Cloud Data Management",
            "Problem Solving",
            "Collaboration",
            "Agile Environment"
        ],
        skillRelevance: [5, 5, 5, 5, 4, 4, 4, 3, 4, 4, 4, 3],
        keyFocusAreas: [
            "Data Pipeline Design",
            "ETL/ELT Process Optimization",
            "Cloud Integration (AWS)",
            "Data Modelling and Warehousing",
            "Cross-Team Collaboration",
            "Data Quality and Governance",
            "Real-time Data Streaming",
            "Reporting and Analytics Automation"
        ]
    },
    analysis: {
        overallScore: 91,
        atsScore: 94,
        skillsMatched: 11,
        skillsTotal: 12,
        experience_relevance: {
            years_required: 3,
            years_candidate_has: 6,
            relevance_explanation:
                "Candidate exceeds experience requirements with 6+ years of combined data engineering and software development background."
        },
        keywordsFound: 40,
        missingSkills: ["Terraform", "Snowflake"],
        missing_skills_priority: [2, 3],
        matchedSkills: [
            "Python",
            "SQL",
            "AWS",
            "Airflow",
            "ETL",
            "Power BI",
            "Docker",
            "Data Modelling",
            "Agile",
            "Problem Solving",
            "Collaboration"
        ],
        recommendations: [
            {
                type: "critical",
                title: "Add Missing Tools",
                description: "Include Terraform and Snowflake to align with enterprise-grade data engineering expectations.",
                impact: "High",
                section: "Skills",
                suggested: "Terraform, Snowflake",
                action: "add"
            },
            {
                type: "high",
                title: "Quantify Impact in Work Experience",
                description:
                    "Add data-driven achievements like ‘Reduced ETL runtime by 30%’ to make the resume results-oriented.",
                impact: "Medium",
                section: "Experience",
                action: "modify"
            },
            {
                type: "medium",
                title: "Highlight Cloud Data Projects",
                description: "Emphasize cloud integration and warehousing experience under projects section.",
                impact: "Medium",
                section: "Projects",
                action: "add"
            }
        ],
        keyword_density: {
            critical_keywords_present: [
                "Python",
                "ETL",
                "Data Pipeline",
                "AWS",
                "SQL"
            ],
            critical_keywords_missing: [
                "Terraform",
                "Snowflake",
                "Data Lakehouse"
            ]
        },
        strengths: [
            "Excellent understanding of ETL and data warehousing.",
            "Strong Python and SQL background with automation expertise.",
            "Experience in both backend and data infrastructure roles."
        ],
        redFlags: ["Limited experience with infrastructure-as-code (Terraform)."]
    },
    charts: {
        radial: [
            { name: "Match Score", value: 91 },
            { name: "ATS Score", value: 94 },
            { name: "Skills", value: 89 },
            { name: "Experience", value: 95 }
        ],
        skillCategories: [
            { category: "Data Engineering", yours: 95, required: 90 },
            { category: "Cloud", yours: 80, required: 85 },
            { category: "ETL/ELT", yours: 92, required: 90 },
            { category: "Database", yours: 88, required: 85 },
            { category: "Analytics", yours: 85, required: 80 },
            { category: "DevOps", yours: 75, required: 80 },
            { category: "Testing", yours: 80, required: 75 }
        ],
        competency: [
            { skill: "Technical Skills", yours: 92, required: 90, fullMark: 100 },
            { skill: "Leadership", yours: 85, required: 80, fullMark: 100 },
            { skill: "Communication", yours: 83, required: 80, fullMark: 100 },
            { skill: "Problem Solving", yours: 90, required: 85, fullMark: 100 },
            { skill: "Team Work", yours: 94, required: 85, fullMark: 100 }
        ],
        matchProgress: [
            { month: "Current", score: 91 },
            { month: "With Missing Skills", score: 95 },
            { month: "With All Suggestions", score: 98 }
        ],
        keywords: [
            { section: "Summary", matched: 5, missing: 0 },
            { section: "Skills", matched: 11, missing: 2 },
            { section: "Experience", matched: 17, missing: 1 },
            { section: "Projects", matched: 6, missing: 1 },
            { section: "Education", matched: 3, missing: 0 }
        ],
        atsCompatibility: [
            { name: "Passed", value: 94 },
            { name: "Failed", value: 6 }
        ],
        skillPriority: [
            { name: "Critical", value: 3, color: "#ef4444" },
            { name: "Important", value: 4, color: "#f97316" },
            { name: "Nice to Have", value: 2, color: "#3b82f6" }
        ]
    }
};
