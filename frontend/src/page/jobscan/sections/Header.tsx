import React from "react";
import { Target } from "lucide-react";

interface Props { onNew?: () => void; }

export default function Header({ onNew }: Props) {
    return (
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">JobScan Analysis</h1>
                            <p className="text-sm text-slate-600">Resume vs Job Description Comparison</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onNew?.()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                        New Analysis
                    </button>
                </div>
            </div>
        </header>
    );
}
