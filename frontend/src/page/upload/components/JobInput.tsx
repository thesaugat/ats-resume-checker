import React from 'react';
import { Link, BarChart3 } from 'lucide-react';

interface JobInputProps {
    jobInput: string;
    setJobInput: (val: string) => void;
    jobUrl: string;
    setJobUrl: (val: string) => void;
    inputMethod: string;
    setInputMethod: (method: string) => void;
}

export default function JobInput({
    jobInput,
    setJobInput,
    jobUrl,
    setJobUrl,
    inputMethod,
    setInputMethod,
}: JobInputProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-slate-900">Job Description</h2>
            </div>

            <div className="space-y-4">
                <div className="flex space-x-2 mb-3">
                    {['paste', 'url'].map((method) => (
                        <button
                            key={method}
                            onClick={() => setInputMethod(method)}
                            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${inputMethod === method
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                        >
                            {method === 'url' ? (
                                <>
                                    <Link className="w-4 h-4 inline mr-2" /> Job URL
                                </>
                            ) : (
                                'Paste Text'
                            )}
                        </button>
                    ))}
                </div>

                {inputMethod === 'url' && (
                    <input
                        type="url"
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        placeholder="https://example.com/job-posting"
                        className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                )}

                <textarea
                    value={jobInput}
                    onChange={(e) => setJobInput(e.target.value)}
                    placeholder={
                        inputMethod === 'url'
                            ? 'Job description will be extracted automatically...'
                            : 'Paste the job description here...'
                    }
                    disabled={inputMethod === 'url' && jobUrl !== ''}
                    className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm disabled:bg-slate-50"
                />
            </div>
        </div>
    );
}
