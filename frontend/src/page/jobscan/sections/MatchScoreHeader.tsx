import React from 'react';

interface MatchScoreHeaderProps {
    analysis: {
        overallScore: number;
        skillsMatched: number;
        skillsTotal: number;
        atsScore: number;
        keywordsFound: number;
    };
}

const MatchScoreHeader: React.FC<MatchScoreHeaderProps> = ({ analysis }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-1 text-slate-900">{analysis.overallScore}%</div>
                <div className="text-slate-600 text-base">Overall Match Score</div>
                <div className="mt-2 inline-block px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-700">
                    Strong Candidate
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-slate-900">{analysis.skillsMatched}/{analysis.skillsTotal}</div>
                    <div className="text-slate-600 text-xs mt-0.5">Skills Match</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-slate-900">{analysis.atsScore}%</div>
                    <div className="text-slate-600 text-xs mt-0.5">ATS Score</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-2xl font-bold text-slate-900">{analysis.keywordsFound}</div>
                    <div className="text-slate-600 text-xs mt-0.5">Keywords</div>
                </div>
            </div>
        </div>
    </div>
);

export default MatchScoreHeader;