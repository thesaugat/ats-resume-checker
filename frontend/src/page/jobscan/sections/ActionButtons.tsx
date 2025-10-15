import React from 'react';
import { Download, Edit3, Target } from 'lucide-react';

const ActionButtons: React.FC = () => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-sm border border-blue-200 p-6 relative">
        {/* Overlay Notice */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.2px] rounded-xl flex items-center justify-center z-10">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-medium">Currently Not Available</p>
            </div>
        </div>

        <h3 className="font-semibold text-slate-900 mb-4">Next Steps</h3>
        <div className="space-y-3">
            <button
                disabled
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium opacity-50 cursor-not-allowed flex items-center justify-center space-x-2"
            >
                <Download className="w-5 h-5" />
                <span>Download Optimized Resume</span>
            </button>
            <button
                disabled
                className="w-full py-3 bg-white text-slate-700 rounded-lg font-medium opacity-50 cursor-not-allowed border border-slate-300 flex items-center justify-center space-x-2"
            >
                <Edit3 className="w-5 h-5" />
                <span>Edit Resume</span>
            </button>
            <button
                disabled
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium opacity-50 cursor-not-allowed flex items-center justify-center space-x-2"
            >
                <Target className="w-5 h-5" />
                <span>Save to Tracker</span>
            </button>
        </div>
    </div>
);

export default ActionButtons;