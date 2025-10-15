import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface Recommendation {
    type: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
    section: string;
    original?: string;
    suggested?: string;
    action: 'add' | 'modify' | 'remove' | 'reorder';
}

const getTypeConfig = (type: Recommendation['type']) => {
    const configs = {
        critical: {
            icon: AlertTriangle,
            color: 'text-rose-600',
            badge: 'bg-rose-100 text-rose-700',
            dotColor: 'bg-rose-500',
            dotCount: 5
        },
        high: {
            icon: TrendingUp,
            color: 'text-amber-600',
            badge: 'bg-amber-100 text-amber-700',
            dotColor: 'bg-amber-500',
            dotCount: 4
        },
        medium: {
            icon: Info,
            color: 'text-blue-600',
            badge: 'bg-blue-100 text-blue-700',
            dotColor: 'bg-blue-500',
            dotCount: 3
        },
        low: {
            icon: Sparkles,
            color: 'text-slate-600',
            badge: 'bg-slate-100 text-slate-700',
            dotColor: 'bg-slate-400',
            dotCount: 2
        }
    };
    return configs[type];
};

const getImpactDot = (impact: Recommendation['impact']) => {
    const dots = {
        High: 'bg-rose-500',
        Medium: 'bg-amber-500',
        Low: 'bg-emerald-500'
    };
    return dots[impact];
};

const RecommendationCard = ({ rec, index }: { rec: Recommendation; index: number }) => {
    const [expanded, setExpanded] = useState(false);
    const typeConfig = getTypeConfig(rec.type);
    const Icon = typeConfig.icon;
    const hasDetails = rec.original || rec.suggested;

    return (
        <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
                <div className={`${typeConfig.color} mt-1`}>
                    <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900 text-base leading-tight">{rec.title}</h4>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            {/* Priority Dots */}
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 h-3 rounded-sm ${i < typeConfig.dotCount ? typeConfig.dotColor : 'bg-slate-200'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${getImpactDot(rec.impact)}`}></span>
                                <span className="text-xs font-medium text-slate-600">{rec.impact}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{rec.description}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center text-xs font-medium text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                            {rec.section}
                        </span>
                        <span className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${typeConfig.badge}`}>
                            {rec.action}
                        </span>
                    </div>

                    {hasDetails && (
                        <>
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 mt-4 transition-colors"
                            >
                                {expanded ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" />
                                        Hide details
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" />
                                        View details
                                    </>
                                )}
                            </button>

                            {expanded && (
                                <div className="mt-4 space-y-3 animate-in fade-in duration-200">
                                    {rec.original && (
                                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Before</div>
                                            <p className="text-sm text-slate-700 leading-relaxed">{rec.original}</p>
                                        </div>
                                    )}
                                    {rec.suggested && (
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                                            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">After</div>
                                            <p className="text-sm text-slate-900 leading-relaxed font-medium">{rec.suggested}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Recommendations({ recommendations }: any) {
    const criticalCount = recommendations.filter((r: Recommendation) => r.type === 'critical').length;
    const highCount = recommendations.filter((r: Recommendation) => r.type === 'high').length;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        Optimization Insights
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                        {recommendations.length} recommendation{recommendations.length !== 1 ? 's' : ''} to improve your resume
                    </p>
                </div>

                {(criticalCount > 0 || highCount > 0) && (
                    <div className="flex items-center gap-3">
                        {criticalCount > 0 && (
                            <div className="flex items-center gap-2 bg-rose-50 px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                                <span className="text-xs font-semibold text-rose-700">{criticalCount} Critical</span>
                            </div>
                        )}
                        {highCount > 0 && (
                            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                <span className="text-xs font-semibold text-amber-700">{highCount} High</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {recommendations.map((rec: Recommendation, idx: number) => (
                    <RecommendationCard key={idx} rec={rec} index={idx} />
                ))}
            </div>
        </div>
    );
}