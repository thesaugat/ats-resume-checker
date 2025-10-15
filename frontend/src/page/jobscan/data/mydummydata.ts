// data/myDummyData.ts
import { ResponseData } from './data';

export const myDummyData: ResponseData = {
    resume: {
        name: "Saugat Timilsina",
        title: "Full Stack Engineer | Data Analytics and Engineering",
        experience: "6+ years",
        location: "Wollongong, NSW, Australia",
        summary: "Software Engineer with 6+ years of experience as a Senior Mobile and Full Stack Developer, now transitioning into Data Engineering and Machine Learning after completing a master's in computer science (Big Data & ML). Skilled in Mobile Dev, Python, and SQL, ETL, ELT and Generative AI with expertise across Android, cross-platform apps, databases, and CRM systems.",
        skills: ["Data Analytics", "ETL/ELT pipelines", "Python", "SQL", "Java", "Kotlin", "Dart", "JavaScript", "Machine Learning", "MongoDB", "PostgreSQL", "AWS"],
        work_experience: [
            {
                company: "PU Assist, Hamro Calendar",
                position: "Founder & Developer",
                duration: "8 years",
                key_responsibilities: [
                    "Built and published cross-platform apps in Flutter with 30K+ daily users.",
                    "Integrated Firebase Realtime DB, Analytics, Crashlytics, and REST APIs for real-time data sync and reporting.",
                    "Managed full app lifecycle: backend integration, CI/CD (GitHub Actions), Dockerised services, and Play/App Store publishing.",
                    "Designed and deployed an automated ETL pipeline using web scraping, APIs, and PDF parsing."
                ],
                technologies_used: ["Flutter", "Firebase", "REST APIs", "Docker", "GitHub Actions"]
            },
            {
                company: "Virtual Technology PVT LTD",
                position: "Mobile App and Full Stack Developer",
                duration: "5 years 9 months",
                key_responsibilities: [
                    "Managed data extraction and transformation from government APIs into secure databases.",
                    "Designed automated workflows to maintain data consistency and reduce manual reporting errors.",
                    "Partnered with teams to define data sets and prepare reports that supported business intelligence initiatives.",
                    "Contributed to a COVID-19 contact tracing app."
                ],
                technologies_used: ["APIs", "GIS", "Google Play", "App Store"]
            },
            {
                company: "Star Phones PTY LTD",
                position: "Hardware / Customer Support",
                duration: "Part-time",
                key_responsibilities: [
                    "Prepared data and inventory reports, performing validation and reconciliation.",
                    "Provided support for O365, networking, and POS systems.",
                    "Supported internal systems monitoring."
                ],
                technologies_used: ["O365"]
            },
            {
                company: "Pokhara Engineering College",
                position: "Part-time Lecturer",
                duration: "2 years 8 months",
                key_responsibilities: [
                    "Taught Android and Flutter development with backend integration.",
                    "Mentored students on applying SQL, Python, and Firebase."
                ],
                technologies_used: ["Android", "Flutter", "SQL", "Python", "Firebase"]
            },
            {
                company: "Metashrine Pvt Ltd",
                position: "Junior Android Developer",
                duration: "1 year 3 months",
                key_responsibilities: [
                    "Developed a restaurant menu & booking system with Java and MVC architecture.",
                    "Integrated RESTful APIs for real-time bookings."
                ],
                technologies_used: ["Java", "MVC"]
            }
        ],
        projects: [
            {
                project_name: "RAG-based AI Chatbot",
                description: "Currently developing a portfolio website chatbot that integrates full-stack development, ETL pipelines, vector databases, and LLMs.",
                technologies_used: ["ETL", "LLMs"],
                role_or_contribution: "Developer"
            },
            {
                project_name: "iPaper",
                description: "Capstone project focused on automated research paper summarisation and grouping.",
                technologies_used: ["RAG", "LLM", "dashboards"],
                role_or_contribution: "Developer"
            }
        ],
        education: [
            {
                degree: "Master of Computer Science",
                institution: "University of Wollongong, Australia",
                year_completed: "2025"
            },
            {
                degree: "Bachelor of Computer Engineering",
                institution: "Pokhara Engineering College, Nepal",
                year_completed: "2018"
            }
        ],
        certifications: [],
        achievements: ["Winner, Software Engineering Competition; Represented the college at Tech Expo."],
        soft_skills: ["Stakeholder Engagement", "Mentoring", "Communication", "Collaboration", "Attention to detail"]
    },
    job: {
        title: "Graduate Data Analyst",
        company: "Abacus Group",
        location: "Sydney, NSW",
        type: "Full-time",
        postedDate: "2 weeks ago",
        requiredSkills: ["Data Analytics", "Microsoft Excel", "Data Management", "Financial Reporting", "Data Cleansing", "Anaplan", "Communication Skills", "Collaboration", "Problem Solving", "Attention to Detail", "Agile Environment", "Forecasting"],
        skillRelevance: [5, 5, 4, 5, 4, 3, 4, 4, 4, 3, 3, 4],
        keyFocusAreas: ["Data Integrity", "Financial Data Management", "Collaboration with Teams", "Reporting and Analysis", "Data Import Processes", "Stakeholder Communication", "Business Intelligence", "Project Support", "Real Estate Sector Development"]
    },
    analysis: {
        overallScore: 87,
        atsScore: 92,
        skillsMatched: 12,
        skillsTotal: 14,
        experience_relevance: {
            years_required: 5,
            years_candidate_has: 6,
            relevance_explanation: "Candidate has more than the required years of experience in mobile development."
        },
        keywordsFound: 35,
        missingSkills: [
            'React Native',
            'Android Auto',
            'Geospatial',
            'Offline-first',
            'Debugging',
            'Clean Code',
            'Application Lifecycle',
            'Feature Implementation'
        ],
        missing_skills_priority: [1, 1, 1, 2, 2, 2, 3, 3],
        matchedSkills: [
            "Java", "Kotlin", "Flutter", "React", "Node.js", "REST APIs",
            "Firebase", "Docker", "CI/CD", "SQL", "Agile", "Unit Testing"
        ],
        recommendations: [
            {
                type: 'critical',
                title: 'Add Missing Critical Skills',
                description: 'Include React Native, Android Auto, and Geospatial skills to align with job requirements.',
                impact: 'High',
                section: 'Skills',
                original: 'Current skills listed',
                suggested: 'React Native, Android Auto, Geospatial',
                action: 'add'
            },
            {
                type: 'high',
                title: 'Highlight Relevant Projects',
                description: 'Add specific projects that demonstrate experience with offline-first applications and debugging.',
                impact: 'Medium',
                section: 'Projects',
                original: 'No relevant projects listed',
                suggested: 'Projects demonstrating offline-first and debugging experience',
                action: 'add'
            },
            {
                type: 'medium',
                title: 'Improve Experience Descriptions',
                description: 'Use action verbs and quantify achievements to make your experience more impactful.',
                impact: 'Medium',
                section: 'Experience',
                original: 'Worked on mobile applications',
                suggested: 'Developed and launched 5+ mobile applications, increasing user engagement by 40%',
                action: 'modify'
            },
            {
                type: 'low',
                title: 'Reorder Education Section',
                description: 'Move your most recent and relevant degree to the top of the education section.',
                impact: 'Low',
                section: 'Education',
                action: 'reorder'
            }
        ],
        keyword_density: {
            critical_keywords_present: ['Java', 'Kotlin', 'Mobile Development', 'Collaboration', 'Problem-solving'],
            critical_keywords_missing: ['React Native', 'Android Auto', 'Geospatial', 'Offline-first', 'Debugging', 'Performance Optimization', 'Clean Code', 'Application Lifecycle']
        },
        strengths: ['Strong experience in mobile development with Kotlin and Java.',
            'Experience in mentoring and collaboration.',
            'Diverse project experience including a COVID-19 contact tracing app.'],
        redFlags: ['Lack of experience with React Native and other critical technologies mentioned in the job description.']

    },


    charts: {
        radial: [
            { name: 'Match Score', value: 87 },
            { name: 'ATS Score', value: 92 },
            { name: 'Skills', value: 85 },
            { name: 'Experience', value: 90 }
        ],
        skillCategories: [
            { category: 'Mobile', yours: 95, required: 95 },
            { category: 'Frontend', yours: 88, required: 90 },
            { category: 'Backend', yours: 85, required: 85 },
            { category: 'Database', yours: 80, required: 85 },
            { category: 'DevOps', yours: 70, required: 80 },
            { category: 'Cloud', yours: 60, required: 75 },
            { category: 'Testing', yours: 85, required: 80 }
        ],
        competency: [
            { skill: 'Technical Skills', yours: 90, required: 90, fullMark: 100 },
            { skill: 'Leadership', yours: 85, required: 80, fullMark: 100 },
            { skill: 'Communication', yours: 80, required: 80, fullMark: 100 },
            { skill: 'Problem Solving', yours: 88, required: 85, fullMark: 100 },
            { skill: 'Team Work', yours: 92, required: 85, fullMark: 100 }
        ],
        matchProgress: [
            { month: 'Current', score: 87 },
            { month: 'With Missing Skills', score: 93 },
            { month: 'With All Suggestions', score: 97 }
        ],
        keywords: [
            { section: 'Summary', matched: 4, missing: 1 },
            { section: 'Skills', matched: 12, missing: 2 },
            { section: 'Experience', matched: 15, missing: 3 },
            { section: 'Projects', matched: 5, missing: 1 },
            { section: 'Education', matched: 3, missing: 0 }
        ],
        atsCompatibility: [
            { name: 'Passed', value: 92 },
            { name: 'Failed', value: 8 }
        ],
        skillPriority: [
            { name: 'Critical', value: 2, color: '#ef4444' },
            { name: 'Important', value: 3, color: '#f97316' },
            { name: 'Nice to Have', value: 2, color: '#3b82f6' }
        ]
    }
};
