// JobScanMVP.tsx
import React, { useState, useEffect, Suspense } from 'react';
import { FileSearch } from 'lucide-react';
import MatchScoreHeader from './sections/MatchScoreHeader';
import SkillPriorityMatrix from './sections/SkillPriorityMatrix';
import MissingSkills from './sections/MissingSkills';
import Recommendations from './sections/Recommendation';
import ProfileInsights from './sections/ProfileInsights';
import SkillsComparison from './sections/SkillsComparison';
import { myDummyData } from './data/mydummydata';
import JobInfoQuickStatsRow from './sections/JobInfoStats';
import ActionButtons from './sections/ActionButtons'
import ResumeJobComparison from './sections/JobResumeDetails';

// Charts (Lazy Loaded)
const KeywordAnalysisDashboard = React.lazy(() => import('./charts/KeyWordAnalysis'));
const CompetencyRadarChart = React.lazy(() => import('./charts/CompetencyRadarChart'));
const ATSPerformanceDashboard = React.lazy(() => import('./charts/AtsPerformanceDashboard'));

interface JobScanMVPProps {
    analysisData?: any;
    onNavigate: (path: string) => void;
}

export default function JobScanMVP({ analysisData, onNavigate }: JobScanMVPProps) {
    // Use API data if available, otherwise use dummy data
    const [data, setData] = useState(analysisData || myDummyData);

    // Update data when analysisData prop changes
    useEffect(() => {
        if (analysisData) {
            setData(analysisData);
        } else {
            setData(myDummyData);
        }
    }, [analysisData]);

    // If no data at all, show empty state
    if (!data) {
        return (
            <div className="text-center py-24">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 max-w-2xl mx-auto">
                    <FileSearch className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">No Analysis Data</h2>
                    <p className="text-slate-600 mb-6">
                        Upload a resume and job description to see analysis results
                    </p>
                    <button
                        onClick={() => onNavigate('/upload')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Go to Upload
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Show badge if using dummy data */}
            {!analysisData && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-amber-700 font-medium">📊 Viewing Demo Data</span>
                        <span className="text-amber-600 text-sm">Upload a resume to see your actual analysis</span>
                    </div>
                    <button
                        onClick={() => onNavigate('/upload')}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
                    >
                        Upload Resume
                    </button>
                </div>
            )}

            {/* Header & Job Info */}
            <MatchScoreHeader analysis={data.analysis} />

            <JobInfoQuickStatsRow
                job={data.job}
                resume={data.resume}
                analysis={data.analysis}
            />

            {/* Charts Grid */}
            <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                    <div className="text-slate-500">Loading charts...</div>
                </div>
            }>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <ATSPerformanceDashboard
                            atsCompatibility={data.charts.radial}
                            radial={data.charts.radial}
                        />
                        <SkillPriorityMatrix data={data.charts.skillPriority} />
                        <KeywordAnalysisDashboard
                            keyword_density={data.analysis.keyword_density}
                            keywords={data.charts.keywords}
                        />
                        <MissingSkills
                            missing_skills={data.analysis.missingSkills}
                            missing_skills_priority={data.analysis.missing_skills_priority}
                        />
                        <ActionButtons />
                    </div>
                    <div className="space-y-6">
                        <ProfileInsights
                            strengths={data.analysis.strengths}
                            red_flags={data.analysis.redFlags}
                        />
                        <CompetencyRadarChart data={data.charts.competency} />
                        <SkillsComparison
                            resume={data.resume}
                            job={data.job}
                            analysis={data.analysis}
                        />

                        <Recommendations recommendations={data.analysis.recommendations || []} />

                    </div>

                </div>
            </Suspense>


            {/* Action Button at Bottom */}
            <div className="flex justify-center pt-8 pb-4">


                <button
                    onClick={() => onNavigate('/upload')}
                    className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                >
                    Analyze Another Resume
                </button>
            </div>
        </div>
    );
}