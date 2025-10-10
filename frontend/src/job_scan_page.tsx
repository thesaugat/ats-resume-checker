// import React, { useState } from 'react';
// import { Upload, Link, FileText, Zap, CheckCircle, XCircle, AlertCircle, Download, BarChart3, Target, TrendingUp, Edit3, ThumbsUp, ThumbsDown, ChevronRight, Briefcase, Calendar, MapPin, Award, Brain, Clock, Users } from 'lucide-react';
// import { RadialBarChart, RadialBar, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// export default function JobScanMVP() {
//     const [activeView, setActiveView] = useState('comparison');

//     // Dummy resume data
//     const resumeData = {
//         name: "Sarah Johnson",
//         title: "Senior Full Stack Developer",
//         experience: "6 years",
//         location: "San Francisco, CA",
//         skills: [
//             "React", "Node.js", "Python", "JavaScript", "TypeScript",
//             "MongoDB", "PostgreSQL", "Git", "REST APIs", "GraphQL",
//             "HTML/CSS", "Redux", "Express.js"
//         ],
//         workExperience: [
//             {
//                 title: "Full Stack Developer",
//                 company: "TechCorp Inc",
//                 duration: "2021 - Present",
//                 highlights: [
//                     "Led development of microservices architecture serving 2M+ users",
//                     "Implemented CI/CD pipeline reducing deployment time by 60%",
//                     "Mentored 5 junior developers in React best practices"
//                 ]
//             },
//             {
//                 title: "Frontend Developer",
//                 company: "StartupXYZ",
//                 duration: "2019 - 2021",
//                 highlights: [
//                     "Built responsive web applications using React and Redux",
//                     "Improved page load time by 40% through optimization",
//                     "Collaborated with UX team on design implementation"
//                 ]
//             }
//         ],
//         education: "BS Computer Science - Stanford University"
//     };

//     // Dummy job description data
//     const jobData = {
//         title: "Senior Software Engineer",
//         company: "InnovateTech Solutions",
//         location: "San Francisco, CA (Hybrid)",
//         type: "Full-time",
//         postedDate: "2 days ago",
//         requiredSkills: [
//             "React", "Node.js", "TypeScript", "Docker", "Kubernetes",
//             "AWS", "Python", "PostgreSQL", "MongoDB", "CI/CD",
//             "Microservices", "GraphQL", "REST APIs", "Agile"
//         ],
//         responsibilities: [
//             "Design and develop scalable web applications",
//             "Lead technical architecture decisions",
//             "Mentor junior developers and conduct code reviews",
//             "Collaborate with cross-functional teams",
//             "Implement automated testing and deployment pipelines"
//         ],
//         requirements: [
//             "5+ years of software development experience",
//             "Strong proficiency in React and Node.js",
//             "Experience with cloud platforms (AWS, Azure, or GCP)",
//             "Knowledge of containerization and orchestration",
//             "Excellent problem-solving and communication skills"
//         ]
//     };

//     // Analysis data
//     const analysisData = {
//         overallScore: 78,
//         atsScore: 85,
//         skillsMatched: 10,
//         skillsTotal: 14,
//         keywordsFound: 28,
//         missingSkills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
//         matchedSkills: ["React", "Node.js", "Python", "TypeScript", "MongoDB", "PostgreSQL", "GraphQL", "REST APIs", "Microservices", "Agile"],
//         sectionScores: [
//             { name: "Skills", score: 71, status: "medium", matched: 10, total: 14 },
//             { name: "Experience", score: 88, status: "good", detail: "6 years (Required: 5+)" },
//             { name: "Education", score: 95, status: "good", detail: "BS Computer Science" },
//             { name: "Keywords", score: 74, status: "medium", matched: 28, total: 38 }
//         ],
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
//             },
//             {
//                 type: "moderate",
//                 title: "Add CI/CD Pipeline Details",
//                 description: "You mentioned CI/CD briefly. Expand on tools used (Jenkins, GitLab CI, GitHub Actions).",
//                 impact: "Medium"
//             },
//             {
//                 type: "minor",
//                 title: "Optimize ATS Keywords",
//                 description: "Add terms like 'scalable', 'cross-functional', and 'technical leadership' naturally in your resume.",
//                 impact: "Low"
//             }
//         ],
//         experienceMatch: {
//             required: "5+ years",
//             yours: "6 years",
//             status: "good"
//         },
//         suggestions: [
//             {
//                 section: "Skills",
//                 original: "React, Node.js, Python, JavaScript, TypeScript",
//                 suggested: "React, Node.js, Python, JavaScript, TypeScript, Docker, AWS, Kubernetes, CI/CD",
//                 action: "add"
//             },
//             {
//                 section: "Work Experience",
//                 original: "Implemented CI/CD pipeline reducing deployment time by 60%",
//                 suggested: "Implemented automated CI/CD pipeline using Jenkins and Docker, reducing deployment time by 60% and enabling 20+ daily releases",
//                 action: "enhance"
//             }
//         ]
//     };

//     // Chart data
//     const radialData = [
//         { name: 'Match Score', value: analysisData.overallScore, fill: '#3b82f6' },
//         { name: 'ATS Score', value: analysisData.atsScore, fill: '#8b5cf6' },
//         { name: 'Skills', value: 71, fill: '#10b981' },
//         { name: 'Experience', value: 88, fill: '#f59e0b' }
//     ];

//     const skillCategoryData = [
//         { category: 'Frontend', yours: 85, required: 90, match: 94 },
//         { category: 'Backend', yours: 80, required: 85, match: 94 },
//         { category: 'Database', yours: 75, required: 70, match: 107 },
//         { category: 'DevOps', yours: 45, required: 80, match: 56 },
//         { category: 'Cloud', yours: 30, required: 75, match: 40 },
//         { category: 'Testing', yours: 60, required: 65, match: 92 }
//     ];

//     const keywordTrendData = [
//         { section: 'Summary', matched: 4, missing: 2, total: 6 },
//         { section: 'Skills', matched: 10, missing: 4, total: 14 },
//         { section: 'Experience', matched: 12, missing: 3, total: 15 },
//         { section: 'Education', matched: 2, missing: 1, total: 3 }
//     ];

//     const competencyRadarData = [
//         { skill: 'Technical Skills', yours: 75, required: 85, fullMark: 100 },
//         { skill: 'Leadership', yours: 80, required: 70, fullMark: 100 },
//         { skill: 'Communication', yours: 70, required: 75, fullMark: 100 },
//         { skill: 'Problem Solving', yours: 85, required: 80, fullMark: 100 },
//         { skill: 'Team Work', yours: 90, required: 85, fullMark: 100 },
//         { skill: 'Innovation', yours: 65, required: 70, fullMark: 100 }
//     ];

//     const matchProgressData = [
//         { month: 'Current', score: 78 },
//         { month: 'With Missing Skills', score: 85 },
//         { month: 'With All Suggestions', score: 92 }
//     ];

//     const atsCompatibilityData = [
//         { name: 'Passed', value: 85 },
//         { name: 'Failed', value: 15 }
//     ];

//     const skillPriorityData = [
//         { name: 'Critical', value: 4, color: '#ef4444' },
//         { name: 'Important', value: 6, color: '#f97316' },
//         { name: 'Nice to Have', value: 4, color: '#3b82f6' }
//     ];

//     const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'];

//     const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);

//     const handleAcceptSuggestion = (idx) => {
//         setAcceptedSuggestions([...acceptedSuggestions, idx]);
//     };

//     const CustomTooltip = ({ active, payload, label }) => {
//         if (active && payload && payload.length) {
//             return (
//                 <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
//                     <p className="text-sm font-semibold text-slate-900">{label}</p>
//                     {payload.map((entry, index) => (
//                         <p key={index} className="text-sm" style={{ color: entry.color }}>
//                             {entry.name}: {entry.value}%
//                         </p>
//                     ))}
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
//             {/* Header */}
//             {/* <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-3">
//                             <div className="bg-blue-600 p-2 rounded-lg">
//                                 <Target className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-slate-900">JobScan Analysis</h1>
//                                 <p className="text-sm text-slate-600">Resume vs Job Description Comparison</p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={() => setActiveView('input')}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
//                         >
//                             New Analysis
//                         </button>
//                     </div>
//                 </div>
//             </header> */}

//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Match Score Header */}
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-6">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="text-center md:text-left">
//                             <div className="text-6xl font-bold mb-2">{analysisData.overallScore}%</div>
//                             <div className="text-blue-100 text-lg">Overall Match Score</div>
//                             <div className="mt-4 inline-block px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
//                                 Strong Candidate
//                             </div>
//                         </div>
//                         <div className="col-span-2 grid grid-cols-3 gap-4">
//                             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                                 <div className="text-3xl font-bold">{analysisData.skillsMatched}/{analysisData.skillsTotal}</div>
//                                 <div className="text-blue-100 text-sm mt-1">Skills Match</div>
//                             </div>
//                             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                                 <div className="text-3xl font-bold">{analysisData.atsScore}%</div>
//                                 <div className="text-blue-100 text-sm mt-1">ATS Score</div>
//                             </div>
//                             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//                                 <div className="text-3xl font-bold">{analysisData.keywordsFound}</div>
//                                 <div className="text-blue-100 text-sm mt-1">Keywords</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Job Info Card */}
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
//                     <div className="flex items-start justify-between">
//                         <div>
//                             <h2 className="text-2xl font-bold text-slate-900 mb-2">{jobData.title}</h2>
//                             <div className="flex flex-wrap items-center gap-4 text-slate-600">
//                                 <div className="flex items-center">
//                                     <Briefcase className="w-4 h-4 mr-2" />
//                                     {jobData.company}
//                                 </div>
//                                 <div className="flex items-center">
//                                     <MapPin className="w-4 h-4 mr-2" />
//                                     {jobData.location}
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Calendar className="w-4 h-4 mr-2" />
//                                     Posted {jobData.postedDate}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Advanced Charts Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                     {/* Radial Score Chart */}
//                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                         <h3 className="text-lg font-semibold text-slate-900 mb-4">Overall Performance Metrics</h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
//                                 <PolarGrid gridType="circle" />
//                                 <RadialBar
//                                     minAngle={15}
//                                     background
//                                     clockWise
//                                     dataKey="value"
//                                     cornerRadius={10}
//                                 />
//                                 <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
//                                 <Tooltip content={<CustomTooltip />} />
//                             </RadialBarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     {/* Skill Category Comparison */}
//                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                         <h3 className="text-lg font-semibold text-slate-900 mb-4">Skill Category Breakdown</h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart data={skillCategoryData}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="category" tick={{ fontSize: 12 }} />
//                                 <YAxis />
//                                 <Tooltip content={<CustomTooltip />} />
//                                 <Legend />
//                                 <Bar dataKey="yours" fill="#3b82f6" name="Your Skills" radius={[8, 8, 0, 0]} />
//                                 <Bar dataKey="required" fill="#8b5cf6" name="Required" radius={[8, 8, 0, 0]} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     {/* Competency Radar Chart */}
//                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                         <h3 className="text-lg font-semibold text-slate-900 mb-4">Competency Analysis</h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <RadarChart data={competencyRadarData}>
//                                 <PolarGrid />
//                                 <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11 }} />
//                                 <PolarRadiusAxis angle={90} domain={[0, 100]} />
//                                 <Radar name="Your Profile" dataKey="yours" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
//                                 <Radar name="Job Requirements" dataKey="required" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
//                                 <Legend />
//                                 <Tooltip />
//                             </RadarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     {/* Match Progress Potential */}
//                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                         <h3 className="text-lg font-semibold text-slate-900 mb-4">Match Score Improvement Potential</h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <AreaChart data={matchProgressData}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="month" />
//                                 <YAxis domain={[0, 100]} />
//                                 <Tooltip content={<CustomTooltip />} />
//                                 <Area type="monotone" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
//                             </AreaChart>
//                         </ResponsiveContainer>
//                         <div className="mt-4 grid grid-cols-3 gap-4 text-center">
//                             <div>
//                                 <div className="text-2xl font-bold text-blue-600">78%</div>
//                                 <div className="text-xs text-slate-600">Current</div>
//                             </div>
//                             <div>
//                                 <div className="text-2xl font-bold text-green-600">+7%</div>
//                                 <div className="text-xs text-slate-600">Add Skills</div>
//                             </div>
//                             <div>
//                                 <div className="text-2xl font-bold text-purple-600">+14%</div>
//                                 <div className="text-xs text-slate-600">All Changes</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Keyword Distribution by Section */}
//                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                         <h3 className="text-lg font-semibold text-slate-900 mb-4">Keyword Distribution by Section</h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart data={keywordTrendData} layout="vertical">
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis type="number" />
//                                 <YAxis dataKey="section" type="category" width={100} />
//                                 <Tooltip content={<CustomTooltip />} />
//                                 <Legend />
//                                 <Bar dataKey="matched" fill="#10b981" name="Matched" stackId="a" radius={[0, 8, 8, 0]} />
//                                 <Bar dataKey="missing" fill="#ef4444" name="Missing" stackId="a" radius={[0, 8, 8, 0]} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>

//                     {/* ATS Compatibility Pie */}
//                     <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                         <h3 className="text-lg font-semibold text-slate-900 mb-4">ATS Compatibility Score</h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <PieChart>
//                                 <Pie
//                                     data={atsCompatibilityData}
//                                     cx="50%"
//                                     cy="50%"
//                                     innerRadius={60}
//                                     outerRadius={100}
//                                     fill="#8884d8"
//                                     paddingAngle={5}
//                                     dataKey="value"
//                                 >
//                                     <Cell fill="#10b981" />
//                                     <Cell fill="#ef4444" />
//                                 </Pie>
//                                 <Tooltip />
//                             </PieChart>
//                         </ResponsiveContainer>
//                         <div className="text-center mt-4">
//                             <div className="text-3xl font-bold text-green-600">85%</div>
//                             <div className="text-sm text-slate-600">ATS systems will likely parse your resume correctly</div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//                     {/* Left Column - Detailed Comparison */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Side-by-Side Comparison */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//                             <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
//                                 <h3 className="text-lg font-semibold text-slate-900">Skills Comparison</h3>
//                             </div>
//                             <div className="grid grid-cols-2 divide-x divide-slate-200">
//                                 <div className="p-6">
//                                     <h4 className="font-semibold text-slate-700 mb-4 flex items-center">
//                                         <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
//                                         Your Skills
//                                     </h4>
//                                     <div className="flex flex-wrap gap-2">
//                                         {resumeData.skills.map((skill, idx) => (
//                                             <span
//                                                 key={idx}
//                                                 className={`px-3 py-1 rounded-full text-sm font-medium ${analysisData.matchedSkills.includes(skill)
//                                                     ? 'bg-green-100 text-green-700 border border-green-300'
//                                                     : 'bg-slate-100 text-slate-700 border border-slate-300'
//                                                     }`}
//                                             >
//                                                 {skill}
//                                                 {analysisData.matchedSkills.includes(skill) && (
//                                                     <CheckCircle className="w-3 h-3 inline ml-1" />
//                                                 )}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 <div className="p-6">
//                                     <h4 className="font-semibold text-slate-700 mb-4 flex items-center">
//                                         <Target className="w-5 h-5 text-blue-500 mr-2" />
//                                         Required Skills
//                                     </h4>
//                                     <div className="flex flex-wrap gap-2">
//                                         {jobData.requiredSkills.map((skill, idx) => (
//                                             <span
//                                                 key={idx}
//                                                 className={`px-3 py-1 rounded-full text-sm font-medium ${resumeData.skills.includes(skill)
//                                                     ? 'bg-green-100 text-green-700 border border-green-300'
//                                                     : 'bg-orange-100 text-orange-700 border border-orange-300'
//                                                     }`}
//                                             >
//                                                 {skill}
//                                                 {!resumeData.skills.includes(skill) && (
//                                                     <AlertCircle className="w-3 h-3 inline ml-1" />
//                                                 )}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Skill Priority Matrix */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="text-lg font-semibold text-slate-900 mb-4">Missing Skills Priority Matrix</h3>
//                             <ResponsiveContainer width="100%" height={250}>
//                                 <PieChart>
//                                     <Pie
//                                         data={skillPriorityData}
//                                         cx="50%"
//                                         cy="50%"
//                                         labelLine={false}
//                                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                                         outerRadius={80}
//                                         fill="#8884d8"
//                                         dataKey="value"
//                                     >
//                                         {skillPriorityData.map((entry, index) => (
//                                             <Cell key={`cell-${index}`} fill={entry.color} />
//                                         ))}
//                                     </Pie>
//                                     <Tooltip />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         </div>

//                         {/* Resume Suggestions */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
//                                 <Edit3 className="w-5 h-5 text-blue-600 mr-2" />
//                                 Resume Optimization Suggestions
//                             </h3>
//                             <div className="space-y-4">
//                                 {analysisData.suggestions.map((suggestion, idx) => (
//                                     <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
//                                         <div className="flex items-start justify-between mb-2">
//                                             <span className="text-xs font-semibold text-blue-600 uppercase">{suggestion.section}</span>
//                                             <span className={`text-xs px-2 py-1 rounded ${suggestion.action === 'add' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
//                                                 }`}>
//                                                 {suggestion.action === 'add' ? 'Add Skills' : 'Enhance'}
//                                             </span>
//                                         </div>
//                                         <div className="mb-3">
//                                             <div className="text-sm text-slate-600 mb-1">Current:</div>
//                                             <div className="text-sm bg-slate-50 p-3 rounded border border-slate-200">{suggestion.original}</div>
//                                         </div>
//                                         <div className="mb-3">
//                                             <div className="text-sm text-slate-600 mb-1">Suggested:</div>
//                                             <div className="text-sm bg-blue-50 p-3 rounded border border-blue-200 font-medium">{suggestion.suggested}</div>
//                                         </div>
//                                         {!acceptedSuggestions.includes(idx) ? (
//                                             <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => handleAcceptSuggestion(idx)}
//                                                     className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
//                                                 >
//                                                     <ThumbsUp className="w-4 h-4" />
//                                                     <span>Accept</span>
//                                                 </button>
//                                                 <button
//                                                     className="flex-1 py-2 px-4 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors flex items-center justify-center space-x-2"
//                                                 >
//                                                     <ThumbsDown className="w-4 h-4" />
//                                                     <span>Reject</span>
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <div className="py-2 px-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
//                                                 ✓ Accepted - Will be applied to your resume
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Column - Recommendations & Actions */}
//                     <div className="space-y-6">
//                         {/* Missing Skills */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
//                                 <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
//                                 Missing Skills
//                             </h3>
//                             <div className="space-y-2">
//                                 {analysisData.missingSkills.map((skill, idx) => (
//                                     <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
//                                         <div className="font-medium text-orange-900">{skill}</div>
//                                         <div className="text-xs text-orange-700 mt-1">High priority for this role</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Recommendations */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommendations</h3>
//                             <div className="space-y-3">
//                                 {analysisData.recommendations.map((rec, idx) => (
//                                     <div key={idx} className={`p-4 rounded-lg border-l-4 ${rec.type === 'critical' ? 'bg-red-50 border-red-500' :
//                                         rec.type === 'important' ? 'bg-orange-50 border-orange-500' :
//                                             rec.type === 'moderate' ? 'bg-yellow-50 border-yellow-500' :
//                                                 'bg-blue-50 border-blue-500'
//                                         }`}>
//                                         <div className="flex items-start justify-between mb-2">
//                                             <h4 className="font-semibold text-slate-900 text-sm">{rec.title}</h4>
//                                             <span className={`text-xs px-2 py-1 rounded font-medium ${rec.impact === 'High' ? 'bg-red-100 text-red-700' :
//                                                 rec.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
//                                                     'bg-blue-100 text-blue-700'
//                                                 }`}>
//                                                 {rec.impact}
//                                             </span>
//                                         </div>
//                                         <p className="text-sm text-slate-700">{rec.description}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6">
//                             <h3 className="font-semibold text-slate-900 mb-4">Next Steps</h3>
//                             <div className="space-y-3">
//                                 <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                                     <Download className="w-5 h-5" />
//                                     <span>Download Optimized Resume</span>
//                                 </button>
//                                 <button className="w-full py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors border border-slate-300 flex items-center justify-center space-x-2">
//                                     <Edit3 className="w-5 h-5" />
//                                     <span>Edit Resume</span>
//                                 </button>
//                                 <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
//                                     <Target className="w-5 h-5" />
//                                     <span>Save to Tracker</span>
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Quick Stats */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="font-semibold text-slate-900 mb-4">Quick Stats</h3>
//                             <div className="space-y-3 text-sm">
//                                 <div className="flex justify-between">
//                                     <span className="text-slate-600">Total Keywords</span>
//                                     <span className="font-semibold text-slate-900">38</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-slate-600">Keywords Matched</span>
//                                     <span className="font-semibold text-green-600">28</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-slate-600">Missing Keywords</span>
//                                     <span className="font-semibold text-orange-600">10</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-slate-600">Resume Length</span>
//                                     <span className="font-semibold text-slate-900">1.5 pages</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-slate-600">ATS Compatibility</span>
//                                     <span className="font-semibold text-green-600">Excellent</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Competitive Advantage */}
//                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                             <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
//                                 <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
//                                 Competitive Edge
//                             </h3>
//                             <div className="space-y-3">
//                                 <div className="p-3 bg-green-50 rounded-lg border border-green-200">
//                                     <div className="flex items-center justify-between mb-1">
//                                         <span className="text-sm font-medium text-green-900">Strong Match</span>
//                                         <CheckCircle className="w-4 h-4 text-green-600" />
//                                     </div>
//                                     <p className="text-xs text-green-700">Your experience level exceeds requirements</p>
//                                 </div>
//                                 <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
//                                     <div className="flex items-center justify-between mb-1">
//                                         <span className="text-sm font-medium text-blue-900">Good Foundation</span>
//                                         <CheckCircle className="w-4 h-4 text-blue-600" />
//                                     </div>
//                                     <p className="text-xs text-blue-700">Core technical skills align well with role</p>
//                                 </div>
//                                 <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
//                                     <div className="flex items-center justify-between mb-1">
//                                         <span className="text-sm font-medium text-orange-900">Growth Area</span>
//                                         <AlertCircle className="w-4 h-4 text-orange-600" />
//                                     </div>
//                                     <p className="text-xs text-orange-700">Add cloud and DevOps skills to stand out</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }