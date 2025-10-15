import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Calendar, Award, GraduationCap, Rocket, Target, Users, FileSearch } from 'lucide-react';
import { ResponseData, Job, Resume } from '../data/data';

interface ResumeJobComparisonProps {
    analysisData?: any;
    onNavigate: (path: string) => void;
}

// Reusable Section Header Component
const SectionHeader: React.FC<{ title: string; color?: string }> = ({ title, color = 'blue' }) => {
    const colorMap = {
        blue: 'bg-blue-600',
        emerald: 'bg-emerald-600',
        purple: 'bg-purple-600'
    };

    return (
        <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2 uppercase tracking-wide">
            <div className={`w-1 h-4 ${colorMap[color as keyof typeof colorMap] || colorMap.blue} rounded`}></div>
            {title}
        </h3>
    );
};

// Reusable Skill Badge Component
const SkillBadge: React.FC<{ skill: string; color?: 'blue' | 'emerald' | 'gray' | 'purple' }> = ({ skill, color = 'blue' }) => {
    const colorStyles = {
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        gray: 'bg-gray-100 text-gray-700 border-gray-200',
        purple: 'bg-purple-50 text-purple-700 border-purple-200'
    };

    return (
        <span className={`px-3 py-1 ${colorStyles[color]} rounded-md text-xs font-medium border`}>
            {skill}
        </span>
    );
};

// Resume Card Header Component
const ResumeHeader: React.FC<{ resume: any; compact?: boolean }> = ({ resume, compact = false }) => {
    const padding = compact ? 'p-4 sm:p-6' : 'p-8';
    const titleSize = compact ? 'text-2xl' : 'text-3xl';
    const subtitleSize = compact ? 'text-lg' : 'text-xl';
    const iconSize = compact ? 14 : 16;

    return (
        <div className={`bg-blue-600 ${padding} text-white`}>
            <h2 className={`${titleSize} font-bold mb-1 sm:mb-2`}>{resume.name}</h2>
            <p className={`${subtitleSize} text-blue-100 mb-3 sm:mb-4`}>{resume.title}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Briefcase size={iconSize} />
                    <span>{resume.experience}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <MapPin size={iconSize} />
                    <span>{resume.location}</span>
                </div>
            </div>
        </div>
    );
};

// Job Card Header Component
const JobHeader: React.FC<{ job: any; compact?: boolean }> = ({ job, compact = false }) => {
    const padding = compact ? 'p-4 sm:p-6' : 'p-8';
    const titleSize = compact ? 'text-2xl' : 'text-3xl';
    const subtitleSize = compact ? 'text-lg' : 'text-xl';
    const iconSize = compact ? 14 : 16;
    const badgeSize = compact ? 'text-xs' : 'text-sm';

    return (
        <div className={`bg-emerald-600 ${padding} text-white`}>
            <div className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full ${badgeSize} mb-2 sm:mb-3`}>
                {job.type}
            </div>
            <h2 className={`${titleSize} font-bold mb-1 sm:mb-2`}>{job.title}</h2>
            <p className={`${subtitleSize} text-emerald-100 mb-3 sm:mb-4`}>{job.company}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm">
                {job.location && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <MapPin size={iconSize} />
                        <span>{job.location}</span>
                    </div>
                )}
                {job.postedDate && (
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <Calendar size={iconSize} />
                        <span>Posted {job.postedDate}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Resume Content Component
const ResumeContent: React.FC<{ resume: any; compact?: boolean }> = ({ resume, compact = false }) => {
    const padding = compact ? 'p-4 sm:p-6' : 'p-8';
    const spacing = compact ? 'space-y-5' : 'space-y-6';

    return (
        <div className={`${padding} ${spacing}`}>
            {/* Professional Summary */}
            <div>
                <SectionHeader title="Professional Summary" color="blue" />
                <p className="text-gray-700 leading-relaxed text-sm">{resume.summary}</p>
            </div>

            {/* Technical Skills */}
            <div>
                <SectionHeader title="Technical Skills" color="blue" />
                <div className="flex flex-wrap gap-1.5">
                    {resume.skills.map((skill: string, idx: number) => (
                        <SkillBadge key={idx} skill={skill} color="blue" />
                    ))}
                </div>
            </div>

            {/* Work Experience */}
            {resume.work_experience?.length > 0 && (
                <div>
                    <SectionHeader title="Work Experience" color="blue" />
                    <div className={compact ? 'space-y-4' : 'space-y-5'}>
                        {resume.work_experience.map((exp: any, idx: number) => (
                            <div key={idx} className="border-l-2 border-blue-200 pl-3 sm:pl-4">
                                <div className={compact ? 'mb-2' : 'mb-3'}>
                                    <h4 className={`font-bold text-gray-800 ${compact ? 'text-sm' : 'text-base'}`}>{exp.position}</h4>
                                    <p className={`text-blue-600 font-medium ${compact ? 'text-xs' : 'text-sm'}`}>{exp.company}</p>
                                    <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>{exp.duration}</p>
                                </div>
                                <ul className={compact ? 'space-y-1 mb-2' : 'space-y-2 mb-3'}>
                                    {exp.key_responsibilities.map((resp: string, ridx: number) => (
                                        <li key={ridx} className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'} flex items-start gap-1.5 sm:gap-2`}>
                                            <span className={`text-blue-600 ${compact ? 'mt-0.5' : 'mt-1'}`}>•</span>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {exp.technologies_used.map((tech: string, tidx: number) => (
                                        <span key={tidx} className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded ${compact ? 'text-xs' : 'text-sm'}`}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resume.projects?.length > 0 && (
                <div>
                    <SectionHeader title="Projects" color="blue" />
                    <div className={compact ? 'space-y-3' : 'space-y-4'}>
                        {resume.projects.map((project: any, idx: number) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                                <div className={`flex items-start gap-2 sm:gap-3 ${compact ? 'mb-1.5' : 'mb-2'}`}>
                                    <Rocket size={compact ? 14 : 18} className={`text-blue-600 ${compact ? 'mt-0.5' : 'mt-1'} flex-shrink-0`} />
                                    <div>
                                        <h4 className={`font-bold text-gray-800 ${compact ? 'text-xs' : 'text-sm'}`}>{project.project_name}</h4>
                                        <p className={`text-gray-600 ${compact ? 'text-xs mt-0.5' : 'text-sm mt-1'}`}>{project.description}</p>
                                    </div>
                                </div>
                                <div className={`flex flex-wrap gap-1 sm:gap-2 ${compact ? 'mt-2' : 'mt-3'}`}>
                                    {project.technologies_used.map((tech: string, tidx: number) => (
                                        <span key={tidx} className={`px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-700 rounded ${compact ? 'text-xs' : 'text-sm'}`}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resume.education?.length > 0 && (
                <div>
                    <SectionHeader title="Education" color="blue" />
                    <div className={compact ? 'space-y-2' : 'space-y-3'}>
                        {resume.education.map((edu: any, idx: number) => (
                            <div key={idx} className={`flex items-start gap-2 sm:gap-3 ${compact ? 'p-3' : 'p-4'} bg-blue-50 rounded-lg border border-blue-200`}>
                                <GraduationCap size={compact ? 16 : 20} className={`text-blue-600 flex-shrink-0 ${compact ? 'mt-0.5' : 'mt-1'}`} />
                                <div>
                                    <h4 className={`font-bold text-gray-800 ${compact ? 'text-xs' : 'text-sm'}`}>{edu.degree}</h4>
                                    <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>{edu.institution}</p>
                                    <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>{edu.year_completed}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Achievements */}
            {resume.achievements?.length > 0 && (
                <div>
                    <SectionHeader title="Achievements" color="blue" />
                    <div className={compact ? 'space-y-2' : 'space-y-3'}>
                        {resume.achievements.map((achievement: string, idx: number) => (
                            <div key={idx} className={`flex items-start gap-2 sm:gap-3 ${compact ? 'p-2' : 'p-3'} bg-yellow-50 rounded-lg border border-yellow-200`}>
                                <Award size={compact ? 14 : 18} className={`text-yellow-600 ${compact ? 'mt-0.5' : 'mt-1'} flex-shrink-0`} />
                                <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-700`}>{achievement}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Soft Skills */}
            {resume.soft_skills?.length > 0 && (
                <div>
                    <SectionHeader title="Soft Skills" color="blue" />
                    <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-3'} gap-1.5 sm:gap-2`}>
                        {resume.soft_skills.map((skill: string, idx: number) => (
                            <div key={idx} className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 ${compact ? 'py-1.5' : 'py-2'} bg-purple-50 rounded-md`}>
                                <Users size={compact ? 12 : 14} className="text-purple-600 flex-shrink-0" />
                                <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-gray-700`}>{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Job Content Component
const JobContent: React.FC<{ job: any; compact?: boolean }> = ({ job, compact = false }) => {
    const padding = compact ? 'p-4 sm:p-6' : 'p-8';
    const spacing = compact ? 'space-y-5' : 'space-y-6';

    return (
        <div className={`${padding} ${spacing}`}>
            {/* Required Skills */}
            <div>
                <SectionHeader title="Required Skills" color="emerald" />
                <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map((skill: string, idx: number) => (
                        <SkillBadge key={idx} skill={skill} color="emerald" />
                    ))}
                </div>
            </div>

            {/* Key Focus Areas */}
            <div>
                <SectionHeader title="Key Focus Areas" color="emerald" />
                <div className={compact ? 'space-y-1.5' : 'space-y-2'}>
                    {job.keyFocusAreas.map((area: string, idx: number) => (
                        <div key={idx} className={`flex items-center gap-2 sm:gap-3 ${compact ? 'p-2.5' : 'p-3'} bg-gray-50 rounded-md border border-gray-200`}>
                            <Target size={compact ? 14 : 16} className="text-emerald-600 flex-shrink-0" />
                            <span className={`${compact ? 'text-xs' : 'text-sm'} text-gray-700`}>{area}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main Component
export default function ResumeJobComparison({ analysisData, onNavigate }: ResumeJobComparisonProps) {
    const [activeTab, setActiveTab] = useState<'comparison' | 'resume' | 'job'>('comparison');

    const resume = analysisData?.resume;
    const job = analysisData?.job;

    // If no data at all, show empty state
    if (!analysisData || !resume || !job) {
        return (
            <div className="min-v-screen bg-gray-50 flex items-center justify-center ">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 sm:p-12 max-w-2xl mx-auto text-center">
                    <FileSearch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No Data Available</h2>
                    <p className="text-slate-600 mb-6">
                        Please upload a resume and job description to view the comparison.
                    </p>
                    <button
                        onClick={() => onNavigate('/upload')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Upload Files
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
                    <nav className="flex flex-wrap gap-2 bg-slate-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('comparison')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeTab === 'comparison'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                }`}
                        >
                            Side by Side
                        </button>
                        <button
                            onClick={() => setActiveTab('resume')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeTab === 'resume'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                }`}
                        >
                            Full Resume
                        </button>
                        <button
                            onClick={() => setActiveTab('job')}
                            className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${activeTab === 'job'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                }`}
                        >
                            Full Job
                        </button>
                    </nav>
                </div>
            </div>

            <div className="p-3 sm:p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Comparison View */}
                    {activeTab === 'comparison' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {/* Resume Card */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <ResumeHeader resume={resume} compact />
                                <ResumeContent resume={resume} compact />
                            </div>

                            {/* Job Card */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <JobHeader job={job} compact />
                                <JobContent job={job} compact />
                            </div>
                        </div>
                    )}

                    {/* Full Resume View */}
                    {activeTab === 'resume' && (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <ResumeHeader resume={resume} />
                                <ResumeContent resume={resume} />
                            </div>
                        </div>
                    )}

                    {/* Full Job View */}
                    {activeTab === 'job' && (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                                <JobHeader job={job} />
                                <JobContent job={job} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}