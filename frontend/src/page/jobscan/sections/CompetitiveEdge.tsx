import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const CompetitiveEdge: React.FC = () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            Competitive Edge
        </h3>
        <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-900">Strong Match</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-xs text-green-700">Your experience level exceeds requirements</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-900">Good Foundation</span>
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-blue-700">Core technical skills align well with role</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-orange-900">Growth Area</span>
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                </div>
                <p className="text-xs text-orange-700">Add cloud and DevOps skills to stand out</p>
            </div>
        </div>
    </div>
);

export default CompetitiveEdge;
