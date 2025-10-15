import React from "react";
import { CheckCircle, Target, AlertCircle } from "lucide-react";

export default function SkillsComparison({ resume, job, analysis }: any) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Skills Comparison</h3>
            </div>
            <div className="divide-y divide-slate-200">
                <div className="p-6">
                    <h4 className="font-semibold text-slate-700 mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Your Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {resume.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${analysis.matchedSkills.includes(skill)
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                                    }`}
                            >
                                {skill}
                                {analysis.matchedSkills.includes(skill) && <CheckCircle className="w-3 h-3 inline ml-1" />}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-6">
                    <h4 className="font-semibold text-slate-700 mb-4 flex items-center">
                        <Target className="w-5 h-5 text-blue-500 mr-2" />
                        Required Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-sm font-medium ${resume.skills.includes(skill)
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-orange-100 text-orange-700 border border-orange-300'
                                    }`}
                            >
                                {skill}
                                {!resume.skills.includes(skill) && <AlertCircle className="w-3 h-3 inline ml-1" />}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}