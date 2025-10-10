import React from 'react';
import { Download, Edit3, Target } from 'lucide-react';

const ActionButtons: React.FC = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Next Steps</h3>
        <div className="space-y-3">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Optimized Resume</span>
            </button>
            <button className="w-full py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors border border-slate-300 flex items-center justify-center space-x-2">
                <Edit3 className="w-5 h-5" />
                <span>Edit Resume</span>
            </button>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Save to Tracker</span>
            </button>
        </div>
    </div>
);

export default ActionButtons;
