import React from 'react';

interface Recommendation {
    title: string;
    description: string;
    type: 'critical' | 'important' | 'moderate' | 'info';
    impact: 'High' | 'Medium' | 'Low';
}

interface RecommendationsProps {
    recommendations: Recommendation[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommendations</h3>
        <div className="space-y-3">
            {recommendations.map((rec, idx) => (
                <div
                    key={idx}
                    className={`p-4 rounded-lg border-l-4 ${rec.type === 'critical'
                            ? 'bg-red-50 border-red-500'
                            : rec.type === 'important'
                                ? 'bg-orange-50 border-orange-500'
                                : rec.type === 'moderate'
                                    ? 'bg-yellow-50 border-yellow-500'
                                    : 'bg-blue-50 border-blue-500'
                        }`}
                >
                    <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-slate-900 text-sm">{rec.title}</h4>
                        <span
                            className={`text-xs px-2 py-1 rounded font-medium ${rec.impact === 'High'
                                    ? 'bg-red-100 text-red-700'
                                    : rec.impact === 'Medium'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-blue-100 text-blue-700'
                                }`}
                        >
                            {rec.impact}
                        </span>
                    </div>
                    <p className="text-sm text-slate-700">{rec.description}</p>
                </div>
            ))}
        </div>
    </div>
);

export default Recommendations;
