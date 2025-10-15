import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, User, TrendingUp, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';


// Combined Layout Component
export default function JobInfoQuickStatsRow({ job, resume, analysis }) {
    const [showExplanation, setShowExplanation] = useState(false);

    const atsRating = analysis.atsScore >= 80 ? 'Excellent' : analysis.atsScore >= 60 ? 'Good' : 'Fair';
    const atsColor = analysis.atsScore >= 80 ? 'text-green-600' : analysis.atsScore >= 60 ? 'text-blue-600' : 'text-orange-600';

    const experienceRelevance = analysis.experience_relevance;
    const meetsRequirement = experienceRelevance?.years_candidate_has >= experienceRelevance?.years_required;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Job Info - Takes 2/3 width on large screens */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-1">{job.title}</h2>
                            <p className="text-slate-600 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                {job.company}
                            </p>
                        </div>
                        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium whitespace-nowrap">
                            {job.type}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="flex items-center text-sm bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs text-blue-600 font-medium">Candidate</span>
                                <span className="font-semibold text-slate-900 truncate">{resume.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                            <MapPin className="w-4 h-4 mr-2.5 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{job.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                            <Calendar className="w-4 h-4 mr-2.5 text-slate-400 flex-shrink-0" />
                            <span className="truncate">Posted {job.postedDate}</span>
                        </div>
                    </div>

                    {/* Experience Relevance Section */}
                    {experienceRelevance && (
                        <div className="relative flex items-center gap-3 text-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
                            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-slate-600">Experience:</span>
                                <span className="font-semibold text-slate-900">{experienceRelevance.years_required}+ yrs required</span>
                                <span className="text-slate-400">•</span>
                                <span className={`font-semibold ${meetsRequirement ? 'text-green-600' : 'text-orange-600'}`}>
                                    {experienceRelevance.years_candidate_has} yrs
                                </span>
                                {meetsRequirement ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-orange-600" />
                                )}
                            </div>
                            <button
                                onClick={() => setShowExplanation(!showExplanation)}
                                className="p-1 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0"
                                title={showExplanation ? "Hide details" : "Show details"}
                            >
                                <Info className={`w-4 h-4 ${showExplanation ? 'text-blue-600' : 'text-slate-400'}`} />
                            </button>
                            {showExplanation && (
                                <div className="absolute top-full mt-2 right-0 w-80 bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs text-slate-600 z-10">
                                    {experienceRelevance.relevance_explanation}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Quick Stats - Takes 1/3 width on large screens */}
                <div className="lg:border-l lg:border-slate-200 lg:pl-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Quick Stats</h3>
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Keywords Found</span>
                            <span className="font-semibold text-green-600">{analysis.keywordsFound}/38</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Skills Match</span>
                            <span className="font-semibold text-blue-600">{analysis.skillsMatched}/{analysis.skillsTotal}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Resume Length</span>
                            <span className="font-semibold text-slate-900">1.5 pages</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                            <span className="text-sm text-slate-600">ATS Score</span>
                            <span className={`font-semibold ${atsColor}`}>{atsRating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}