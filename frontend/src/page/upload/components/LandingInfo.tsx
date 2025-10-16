import React from 'react';
import { Github, BookOpen, Linkedin, Globe } from 'lucide-react';

const JobscanCard: React.FC = () => {
    return (
        <div className="">
            <div className="max-w-7xl mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                {/* Content Section */}
                <div className="p-8">

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            About Jobscan MVP
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Jobscan MVP is a tool designed to help job seekers optimize their resumes
                            for Applicant Tracking Systems (ATS). By analyzing job descriptions and
                            comparing them with your resume, it provides actionable insights to improve
                            your match rate and increase your chances of landing interviews.
                        </p>
                    </div>

                    {/* Features/Highlights */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                            Key Features
                        </h3>
                        <div className="text-gray-600 text-sm">
                            ATS-friendly resume analysis • Keyword matching • Real-time scoring
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="flex gap-4 mb-6">
                        <a
                            href="https://github.com/thesaugat/ats-resume-checker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm"
                        >
                            <Github className="w-4 h-4 text-gray-700" />
                            <span className="text-gray-700">GitHub</span>
                        </a>

                        <a
                            href="https://medium.com/@thesaugat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-sm"
                        >
                            <BookOpen className="w-4 h-4 text-gray-700" />
                            <span className="text-gray-700">Medium Article</span>
                        </a>
                    </div>

                    {/* Author Section */}
                    <div className="pt-6 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 -mx-8 px-8 -mb-8 pb-8">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/android-chrome-192x192.png"
                                    alt="Logo"
                                    className="w-10 h-10 rounded-full border-2 border-blue-200"
                                />
                                <div>
                                    <p className="text-lg font-bold text-gray-800">Saugat Timilsina</p>
                                    <p className="text-xs text-gray-500">
                                        Data Analytics & Engineer | Senior Mobile Dev | Full Stack Dev | AI Engineer
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">
                                Questions? Let's chat!
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href="https://www.linkedin.com/in/thesaugat/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span>Connect on LinkedIn</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-500 rounded-md cursor-not-allowed text-sm"
                            >
                                <Globe className="w-4 h-4" />
                                <span>Website (Coming Soon)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobscanCard;