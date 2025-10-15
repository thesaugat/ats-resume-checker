import React from 'react';
import { CheckCircle2, XCircle, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                <p className="font-semibold text-slate-800 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const KeywordAnalysisDashboard = ({ keyword_density, keywords }: any) => {
    const data = {
        keyword_density: keyword_density,
        keywords: keywords
    };

    const totalMatched = data.keywords.reduce((sum, item) => sum + item.matched, 0);
    const totalMissing = data.keywords.reduce((sum, item) => sum + item.missing, 0);

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 p-6 space-y-6">
            {/* Keywords Section */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800">Keywords</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Present</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.keyword_density.critical_keywords_present.map((keyword, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-200 hover:bg-emerald-100 transition-colors"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Missing</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.keyword_density.critical_keywords_missing.map((keyword, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium border border-rose-200 hover:bg-rose-100 transition-colors"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Chart Section */}
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-slate-600" />
                        <h3 className="text-lg font-bold text-slate-800">Section Performance</h3>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-700">{totalMatched}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full border border-rose-200">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span className="text-sm font-semibold text-rose-700">{totalMissing}</span>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%', height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.keywords} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
                            <YAxis dataKey="section" type="category" width={100} stroke="#64748b" style={{ fontSize: '13px', fontWeight: 500 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
                                iconType="circle"
                            />
                            <Bar dataKey="matched" fill="#10b981" name="Matched" stackId="a" radius={[0, 4, 4, 0]} />
                            <Bar dataKey="missing" fill="#ef4444" name="Missing" stackId="a" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default KeywordAnalysisDashboard;