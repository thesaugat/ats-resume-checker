// data/myDummyData.ts
import { ResponseData } from './data';

export const myDummyData: ResponseData = {
    resume: {
        name: "Saugat Timilsina",
        title: "Mobile & Full Stack Developer",
        experience: "8+ years",
        location: "Wollongong, NSW",
        skills: [
            "Java", "Kotlin", "Flutter", "React", "Node.js", "Python",
            "Firebase", "REST APIs", "SQL", "MongoDB", "Docker", "CI/CD", "Git", "Agile", "Unit Testing"
        ]
    },
    job: {
        title: "Senior Mobile & Full Stack Engineer",
        company: "NextGen Tech Solutions",
        location: "Sydney, NSW (Hybrid)",
        type: "Full-time",
        postedDate: "3 days ago",
        requiredSkills: [
            "Kotlin", "Java", "Flutter", "Jetpack Compose", "React", "Node.js",
            "REST APIs", "Firebase", "Docker", "CI/CD", "SQL", "Agile", "Unit Testing"
        ]
    },
    analysis: {
        overallScore: 87,
        atsScore: 92,
        skillsMatched: 12,
        skillsTotal: 14,
        keywordsFound: 35,
        missingSkills: ["Jetpack Compose", "Cloud Deployment"],
        matchedSkills: [
            "Java", "Kotlin", "Flutter", "React", "Node.js", "REST APIs",
            "Firebase", "Docker", "CI/CD", "SQL", "Agile", "Unit Testing"
        ],
        recommendations: [
            {
                type: "critical",
                title: "Add Jetpack Compose Projects",
                description: "Job highly emphasizes Jetpack Compose. Consider adding relevant projects in your portfolio or GitHub.",
                impact: "High"
            },
            {
                type: "important",
                title: "Include Cloud Deployment Experience",
                description: "Highlight any work with cloud platforms or deployment pipelines (AWS, GCP, Docker).",
                impact: "High"
            },
            {
                type: "moderate",
                title: "Quantify Achievements in Projects",
                description: "Add measurable outcomes like 'Reduced app load time by 35%' or 'Handled 50K+ daily users'.",
                impact: "Medium"
            },
            {
                type: "info",
                title: "Add Soft Skills Highlights",
                description: "Include leadership, communication, or mentoring experience to stand out.",
                impact: "Low"
            }
        ],
        suggestions: [
            {
                section: "Skills",
                original: "Java, Kotlin, Flutter, React, Node.js, Python, Firebase",
                suggested: "Java, Kotlin, Flutter, React, Node.js, Python, Firebase, Jetpack Compose, SQL, Docker, CI/CD, Agile, Unit Testing",
                action: "add"
            },
            {
                section: "Work Experience",
                original: "Developed cross-platform apps with Flutter and Firebase",
                suggested: "Developed cross-platform apps with Flutter, Firebase, and CI/CD pipelines, serving 50K+ daily users; integrated cloud services and automated testing pipelines",
                action: "enhance"
            },
            {
                section: "Projects",
                original: "PU Assist app with 30K+ daily users",
                suggested: "PU Assist app with 30K+ daily users; led feature migration to Jetpack Compose; improved backend API response by 40%",
                action: "enhance"
            }
        ]
    },
    charts: {
        radial: [
            { name: 'Match Score', value: 87, fill: '#3b82f6' },
            { name: 'ATS Score', value: 92, fill: '#8b5cf6' },
            { name: 'Skills', value: 85, fill: '#10b981' },
            { name: 'Experience', value: 90, fill: '#f59e0b' }
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
