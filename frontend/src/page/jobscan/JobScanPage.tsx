// JobScanMVP.tsx
import React, { useState, useEffect, Suspense } from 'react';
import MatchScoreHeader from './sections/MatchScoreHeader';

import SkillPriorityMatrix from './sections/SkillPriorityMatrix';
import MissingSkills from './sections/MissingSkills';
import Recommendations from './sections/Recommendations';
import ActionButtons from './sections/ActionButtons';
import CompetitiveEdge from './sections/CompetitiveEdge';
import SkillsComparison from './sections/SkillsComparison';
import ResumeSuggestions from './sections/ResumeSuggestions';
// import { dummyData, ResponseData } from './data/data';
import { myDummyData } from './data/mydummydata';
import JobInfoQuickStatsRow from './sections/JobInfoStats';

// Charts (Lazy Loaded)

const SkillCategoryChart = React.lazy(() => import('./charts/SkillCategoryChart'));
const CompetencyRadarChart = React.lazy(() => import('./charts/CompetencyRadarChart'));
const MatchProgressChart = React.lazy(() => import('./charts/MatchProgressChart'));
const KeywordDistributionChart = React.lazy(() => import('./charts/KeywordDistributionChart'));
const ATSPerformanceDashboard = React.lazy(() => import('./charts/AtsPerformanceDashboard'));

// Data Toggle Component
const DataToggle = ({ useApi, setUseApi }: { useApi: boolean, setUseApi: React.Dispatch<React.SetStateAction<boolean>> }) => (
    <div className="mb-4 flex justify-end">
        <button
            onClick={() => setUseApi(!useApi)}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
        >
            {useApi ? 'Using API Data' : 'Using Dummy Data'}
        </button>
    </div>
);

// ======= Dummy Data =======
// const dummyData = {
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
//             { type: "critical", title: "Add Cloud Infrastructure Skills", description: "The job requires AWS experience. Consider adding cloud certifications or relevant projects.", impact: "High" },
//             { type: "important", title: "Include Containerization Experience", description: "Docker and Kubernetes are mentioned multiple times. Add any experience with containerization.", impact: "High" },
//             { type: "moderate", title: "Quantify Your Achievements", description: "Use more metrics like 'Improved performance by 40%' or 'Reduced costs by $50K annually'.", impact: "Medium" }
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
const dummyData = myDummyData;

// ======= API Service =======
const apiService = {
    analyze: async (resumeFile?: File, jobDescription?: string) => {
        // TODO: implement actual API call
        return myDummyData;
    }
};

// ======= Main Component =======
export default function JobScanMVP() {
    const [data, setData] = useState(dummyData);
    const [useApi, setUseApi] = useState(false);
    const [acceptedSuggestions, setAcceptedSuggestions] = useState<number[]>([]);

    useEffect(() => {
        if (useApi) {
            // API call placeholder
            // apiService.analyze(resumeFile, jobDescription).then(setData);
        } else {
            setData(dummyData);
        }
    }, [useApi]);

    const handleAcceptSuggestion = (idx: number) => {
        setAcceptedSuggestions([...acceptedSuggestions, idx]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* <DataToggle useApi={useApi} setUseApi={setUseApi} /> */}

                {/* Header & Job Info */}
                <MatchScoreHeader analysis={data.analysis} />
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <JobInfoCard job={data.job} resume={data.resume} />
                    <QuickStats analysis={data.analysis} />
                </div> */}

                <JobInfoQuickStatsRow
                    job={data.job}
                    resume={data.resume}
                    analysis={data.analysis}
                />
                {/* Charts Grid */}
                <Suspense fallback={<div>Loading Chart...</div>}>





                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <ATSPerformanceDashboard
                            atsCompatibility={data.charts.radial}
                            radial={data.charts.radial}
                        />
                        <SkillCategoryChart data={data.charts.skillCategories} />
                        <CompetencyRadarChart data={data.charts.competency} />
                        <MatchProgressChart data={data.charts.matchProgress} />
                        <KeywordDistributionChart data={data.charts.keywords} />
                        <SkillPriorityMatrix data={data.charts.skillPriority} />
                    </div>
                </Suspense>

                {/* Main Content */}
                <div className="space-y-6">
                    <SkillsComparison resume={data.resume} job={data.job} analysis={data.analysis} />



                    {/* 3-column layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <MissingSkills skills={data.analysis.missingSkills || []} />

                        <CompetitiveEdge />
                    </div>

                    {/* 2-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ResumeSuggestions
                            suggestions={data.analysis.suggestions || []}
                            acceptedSuggestions={acceptedSuggestions}
                            onAccept={handleAcceptSuggestion}
                        />
                        <Recommendations recommendations={data.analysis.recommendations || []} />
                        <ActionButtons />

                    </div>
                    {/* 2-column layout */}
                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



                    </div> */}
                </div>
            </main>
        </div >
    );
}
