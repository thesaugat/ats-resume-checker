import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface ProfileInsightsProps {
    strengths: string[];
    red_flags: string[];
}

export default function ProfileInsights({ strengths, red_flags }: ProfileInsightsProps) {
    const totalItems = strengths.length + red_flags.length;
    const strengthPercentage = totalItems > 0 ? Math.round((strengths.length / totalItems) * 100) : 0;

    return (
        <div className="bg-gradient-to-br from-white via-slate-50 to-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {/* Header with Score */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-slate-900">Profile Insights</h3>
                <div className="flex items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${strengthPercentage >= 70 ? 'bg-emerald-100 text-emerald-700' :
                        strengthPercentage >= 50 ? 'bg-amber-100 text-amber-700' :
                            'bg-rose-100 text-rose-700'
                        }`}>
                        {strengthPercentage}%
                    </div>
                </div>
            </div>

            {/* Visual Balance Bar */}
            <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
                    <span>Match Score</span>
                    <span>{strengths.length}/{totalItems}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700 ease-out"
                        style={{ width: `${strengthPercentage}%` }}
                    ></div>
                </div>
            </div>

            <div className="space-y-5">
                {/* Strengths */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500">
                            <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">What Works</h4>
                        <span className="ml-auto text-xs font-semibold text-emerald-700">{strengths.length}</span>
                    </div>
                    <div className="space-y-2 pl-8">
                        {strengths.map((strength, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-6 top-2 w-2 h-2 rounded-full bg-emerald-400"></div>
                                <p className="text-sm text-slate-700 leading-relaxed">{strength}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Red Flags */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-rose-500">
                            <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">Needs Work</h4>
                        <span className="ml-auto text-xs font-semibold text-rose-700">{red_flags.length}</span>
                    </div>
                    <div className="space-y-2 pl-8">
                        {red_flags.map((flag, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-6 top-2 w-2 h-2 rounded-full bg-rose-400"></div>
                                <p className="text-sm text-slate-700 leading-relaxed">{flag}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}