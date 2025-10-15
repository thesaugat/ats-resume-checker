import React from 'react';
import { Target, Upload, FileSearch, FileText } from 'lucide-react';

interface HeaderProps {
    currentPath: string;
    onNavigate: (path: string) => void;
}

export default function Header({ currentPath, onNavigate }: HeaderProps) {
    return (
        <header className="bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                {/* Desktop Layout - Same as before */}
                <div className="hidden md:flex items-center justify-between">
                    <div
                        className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onNavigate('/upload')}
                    >
                        <div className="rounded-lg">
                            <img
                                src="/android-chrome-192x192.png"
                                alt="Logo"
                                className="w-10 h-10"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">JobScan MVP</h1>
                    </div>
                    <nav className="flex space-x-1 bg-slate-100 rounded-lg p-1">
                        <button
                            onClick={() => onNavigate('/upload')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentPath === '/upload'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <Upload className="w-4 h-4" />
                            Scan Resume
                        </button>
                        <button
                            onClick={() => onNavigate('/jobscan')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentPath === '/jobscan'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <FileSearch className="w-4 h-4" />
                            View Results
                        </button>
                        <button
                            onClick={() => onNavigate('/jobResume')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${currentPath === '/jobResume'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Job & Resume
                        </button>
                    </nav>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col items-center gap-3">
                    <div
                        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onNavigate('/upload')}
                    >
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <Target className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">JobScan MVP</h1>
                    </div>
                    <nav className="flex space-x-1 bg-slate-100 rounded-lg p-1 w-full">
                        <button
                            onClick={() => onNavigate('/upload')}
                            className={`flex-1 px-2 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${currentPath === '/upload'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <Upload className="w-4 h-4" />
                            Scan
                        </button>
                        <button
                            onClick={() => onNavigate('/jobscan')}
                            className={`flex-1 px-2 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${currentPath === '/jobscan'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <FileSearch className="w-4 h-4" />
                            Results
                        </button>
                        <button
                            onClick={() => onNavigate('/jobResume')}
                            className={`flex-1 px-2 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${currentPath === '/jobResume'
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            View
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}