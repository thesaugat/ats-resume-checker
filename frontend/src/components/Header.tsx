import React from 'react';
import { Target } from 'lucide-react';

interface HeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">JobScan MVP</h1>
                    </div>
                    <nav className="flex space-x-1 bg-slate-100 rounded-lg p-1">
                        {['scan', 'tracker'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {tab === 'scan' ? 'Scan Resume' : 'Job Tracker'}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}
