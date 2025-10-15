import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface ResumeUploaderProps {
    resumeInput: string;
    setResumeInput: (val: string) => void;
    resumeFile: File | null;
    setResumeFile: (file: File | null) => void;
}

export default function ResumeUploader({ resumeInput, setResumeInput, resumeFile, setResumeFile }: ResumeUploaderProps) {
    const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
        const validExtensions = ['.pdf', '.txt', '.doc', '.docx'];

        const hasValidType = validTypes.includes(file.type);
        const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

        if (hasValidType || hasValidExtension) {
            setResumeFile(file);
            setResumeInput(''); // Clear text input when file is selected
        } else {
            alert('Please upload a PDF, DOC, DOCX, or TXT file');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemoveFile = () => {
        setResumeFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeInput(e.target.value);
        setResumeFile(null); // Clear file when text is entered
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-900">Your Resume</h2>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-2 mb-3">
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'upload'
                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Upload className="w-4 h-4 inline mr-2" />
                        Upload File
                    </button>
                    <button
                        onClick={() => setActiveTab('paste')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'paste'
                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        Paste Text
                    </button>
                </div>

                {activeTab === 'paste' ? (
                    <textarea
                        value={resumeInput}
                        onChange={handleTextChange}
                        placeholder="Paste your resume text here..."
                        className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                    />
                ) : (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${isDragging
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-300 bg-slate-50'
                            }`}
                    >
                        {!resumeFile ? (
                            <div className="py-8">
                                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <p className="text-slate-600 mb-2 text-sm">
                                    Drag and drop your resume here
                                </p>
                                <p className="text-slate-400 text-sm mb-4">or</p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Browse Files
                                </button>
                                <p className="text-slate-400 text-xs mt-3">
                                    Supported: PDF, DOC, DOCX, TXT
                                </p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                    <div className="text-left">
                                        <p className="font-medium text-slate-800 text-sm">{resumeFile.name}</p>
                                        <p className="text-xs text-slate-500">
                                            {(resumeFile.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleRemoveFile}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Remove file"
                                >
                                    <X className="w-5 h-5 text-slate-600" />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}