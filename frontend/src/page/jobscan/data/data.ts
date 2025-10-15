// data/data.ts
export type Recommendation = {
    type: "critical" | "high" | "medium" | "low";
    title: string;
    description: string;
    impact: "High" | "Medium" | "Low";
    section: string;
    original?: string;
    suggested?: string;
    action: "add" | "modify" | "remove" | "reorder";
};

export type KeyWordDensity = {
    critical_keywords_present: string[];
    critical_keywords_missing: string[];
}
export type ExperienceRelevence = {
    years_required: number,
    years_candidate_has: number,
    relevance_explanation: string

}


export type Analysis = {
    overallScore: number;
    atsScore: number;
    skillsMatched: number;
    skillsTotal: number;
    experience_relevance: ExperienceRelevence;
    keywordsFound: number;
    missingSkills: string[];
    missing_skills_priority: number[];
    matchedSkills: string[];
    keyword_density: KeyWordDensity;
    strengths: string[];
    redFlags: string[];
    recommendations: Recommendation[];

};
export type WorkExperience = {
    company: string;
    position: string;
    duration: string;
    key_responsibilities: string[];
    technologies_used: string[];
}

export type Projects = {
    project_name: string;
    description: string;
    technologies_used: string[];
    role_or_contribution: string;

}
export type Education = {
    degree: string;
    institution: string;
    year_completed: string;
}

export type Resume = {
    name: string;
    title: string;
    experience: string;
    location: string;
    summary: string;
    skills: string[];
    work_experience: WorkExperience[];
    projects: Projects[];
    education: Education[];
    certifications: string[];
    achievements: string[];
    soft_skills: string[]

};

export type Job = {
    title: string;
    company: string;
    location: string;
    type: string;
    postedDate: string;
    requiredSkills: string[];
    skillRelevance: number[];
    keyFocusAreas: string[];
};

export type ChartData = {
    radial: { name: string; value: number }[];
    skillCategories: { category: string; yours: number; required: number }[];
    competency: { skill: string; yours: number; required: number; fullMark: number }[];
    matchProgress: { month: string; score: number }[];
    keywords: { section: string; matched: number; missing: number }[];
    atsCompatibility: { name: string; value: number }[];
    skillPriority: { name: string; value: number; color: string }[];
};

export type ResponseData = {
    resume: Resume;
    job: Job;
    analysis: Analysis;
    charts: ChartData;
};


// export const dummyData: ResponseData = {
//     resume: {
//         name: "Sarah Johnson",
//         title: "Senior Full Stack Developer",
//         experience: "6 years",
//         location: "San Francisco, CA",
//         skills: ["React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB", "PostgreSQL", "Git", "REST APIs", "GraphQL", "HTML/CSS", "Redux", "Express.js"]
//     },
//     job: {
//         title: "Senior Software Engineer",
//         company: "InnovateTech Solutions",
//         location: "San Francisco, CA (Hybrid)",
//         type: "Full-time",
//         postedDate: "2 days ago",
//         requiredSkills: ["React", "Node.js", "TypeScript", "Docker", "Kubernetes", "AWS", "Python", "PostgreSQL", "MongoDB", "CI/CD", "Microservices", "GraphQL", "REST APIs", "Agile"]
//     },
//     analysis: {
//         overallScore: 78,
//         atsScore: 85,
//         skillsMatched: 10,
//         skillsTotal: 14,
//         keywordsFound: 28,
//         missingSkills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
//         matchedSkills: ["React", "Node.js", "Python", "TypeScript", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs", "Microservices", "Agile"],
//         recommendations: [
//             {
//                 type: "critical",
//                 title: "Add Cloud Infrastructure Skills",
//                 description: "The job requires AWS experience. Consider adding cloud certifications or relevant projects.",
//                 impact: "High"
//             },
//             {
//                 type: "important",
//                 title: "Include Containerization Experience",
//                 description: "Docker and Kubernetes are mentioned multiple times. Add any experience with containerization.",
//                 impact: "High"
//             },
//             {
//                 type: "moderate",
//                 title: "Quantify Your Achievements",
//                 description: "Use more metrics like 'Improved performance by 40%' or 'Reduced costs by $50K annually'.",
//                 impact: "Medium"
//             }
//         ],
//         suggestions: [
//             { section: "Skills", original: "React, Node.js, Python, JavaScript, TypeScript", suggested: "React, Node.js, Python, JavaScript, TypeScript, Docker, AWS, Kubernetes, CI/CD", action: "add" },
//             { section: "Work Experience", original: "Implemented CI/CD pipeline reducing deployment time by 60%", suggested: "Implemented automated CI/CD pipeline using Jenkins and Docker, reducing deployment time by 60% and enabling 20+ daily releases", action: "enhance" }
//         ]
//     },
//     charts: {
//         radial: [
//             { name: 'Match Score', value: 78, fill: '#3b82f6' },
//             { name: 'ATS Score', value: 85, fill: '#8b5cf6' },
//             { name: 'Skills', value: 71, fill: '#10b981' },
//             { name: 'Experience', value: 88, fill: '#f59e0b' }
//         ],
//         skillCategories: [
//             { category: 'Frontend', yours: 85, required: 90 },
//             { category: 'Backend', yours: 80, required: 85 },
//             { category: 'Database', yours: 75, required: 70 },
//             { category: 'DevOps', yours: 45, required: 80 },
//             { category: 'Cloud', yours: 30, required: 75 },
//             { category: 'Testing', yours: 60, required: 65 }
//         ],
//         competency: [
//             { skill: 'Technical Skills', yours: 75, required: 85, fullMark: 100 },
//             { skill: 'Leadership', yours: 80, required: 70, fullMark: 100 },
//             { skill: 'Communication', yours: 70, required: 75, fullMark: 100 },
//             { skill: 'Problem Solving', yours: 85, required: 80, fullMark: 100 },
//             { skill: 'Team Work', yours: 90, required: 85, fullMark: 100 }
//         ],
//         matchProgress: [
//             { month: 'Current', score: 78 },
//             { month: 'With Missing Skills', score: 85 },
//             { month: 'With All Suggestions', score: 92 }
//         ],
//         keywords: [
//             { section: 'Summary', matched: 4, missing: 2 },
//             { section: 'Skills', matched: 10, missing: 4 },
//             { section: 'Experience', matched: 12, missing: 3 },
//             { section: 'Education', matched: 2, missing: 1 }
//         ],
//         atsCompatibility: [
//             { name: 'Passed', value: 85 },
//             { name: 'Failed', value: 15 }
//         ],
//         skillPriority: [
//             { name: 'Critical', value: 4, color: '#ef4444' },
//             { name: 'Important', value: 6, color: '#f97316' },
//             { name: 'Nice to Have', value: 4, color: '#3b82f6' }
//         ]
//     }
// };


