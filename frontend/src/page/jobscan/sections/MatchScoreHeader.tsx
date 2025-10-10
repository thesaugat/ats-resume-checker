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
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
                <div className="text-6xl font-bold mb-2">{analysis.overallScore}%</div>
                <div className="text-blue-100 text-lg">Overall Match Score</div>
                <div className="mt-4 inline-block px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                    Strong Candidate
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">{analysis.skillsMatched}/{analysis.skillsTotal}</div>
                    <div className="text-blue-100 text-sm mt-1">Skills Match</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">{analysis.atsScore}%</div>
                    <div className="text-blue-100 text-sm mt-1">ATS Score</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">{analysis.keywordsFound}</div>
                    <div className="text-blue-100 text-sm mt-1">Keywords</div>
                </div>
            </div>
        </div>
    </div>
);

export default MatchScoreHeader;
