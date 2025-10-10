import React from "react";
import { Edit3, ThumbsUp, ThumbsDown } from "lucide-react";

export default function ResumeSuggestions({ suggestions, acceptedSuggestions, onAccept }: any) {
    // const [accepted, setAccepted] = React.useState<number[]>([]);

    // function accept(i: number) {
    //     setAccepted((s) => (s.includes(i) ? s : [...s, i]));
    //     onAccept?.(i);
    // }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Edit3 className="w-5 h-5 text-blue-600 mr-2" />
                Resume Optimization Suggestions
            </h3>
            <div className="space-y-4">
                {suggestions.map((suggestion, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-semibold text-blue-600 uppercase">{suggestion.section}</span>
                            <span className={`text-xs px-2 py-1 rounded ${suggestion.action === 'add' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {suggestion.action === 'add' ? 'Add Skills' : 'Enhance'}
                            </span>
                        </div>
                        <div className="mb-3">
                            <div className="text-sm text-slate-600 mb-1">Current:</div>
                            <div className="text-sm bg-slate-50 p-3 rounded border border-slate-200">{suggestion.original}</div>
                        </div>
                        <div className="mb-3">
                            <div className="text-sm text-slate-600 mb-1">Suggested:</div>
                            <div className="text-sm bg-blue-50 p-3 rounded border border-blue-200 font-medium">{suggestion.suggested}</div>
                        </div>
                        {!acceptedSuggestions.includes(idx) ? (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onAccept(idx)}
                                    className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Accept</span>
                                </button>
                                <button className="flex-1 py-2 px-4 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors flex items-center justify-center space-x-2">
                                    <ThumbsDown className="w-4 h-4" />
                                    <span>Reject</span>
                                </button>
                            </div>
                        ) : (
                            <div className="py-2 px-4 bg-green-100 text-green-700 rounded-lg text-sm font-medium text-center">
                                ✓ Accepted - Will be applied to your resume
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}


