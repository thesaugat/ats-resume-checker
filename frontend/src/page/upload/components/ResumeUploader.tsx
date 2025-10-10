import React from 'react';
import { Upload, FileText } from 'lucide-react';

interface ResumeUploaderProps {
    resumeInput: string;
    setResumeInput: (val: string) => void;
}

export default function ResumeUploader({ resumeInput, setResumeInput }: ResumeUploaderProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-900">Your Resume</h2>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-2 mb-3">
                    <button className="flex-1 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Upload File
                    </button>
                    <button className="flex-1 py-2 px-3 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                        Paste Text
                    </button>
                </div>

                <textarea
                    value={resumeInput}
                    onChange={(e) => setResumeInput(e.target.value)}
                    placeholder="Paste your resume text here or upload a file..."
                    className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                />
            </div>
        </div>
    );
}
