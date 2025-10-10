import React from "react";
import { useState } from 'react'
import ResumeUploader from './components/ResumeUploader'
import JobInput from './components/JobInput'
import LoaderButton from './components/LoaderButton'


function UploadPage() {
    const [activeTab, setActiveTab] = useState('scan')
    const [resumeInput, setResumeInput] = useState('')
    const [jobInput, setJobInput] = useState('')
    const [jobUrl, setJobUrl] = useState('')
    const [inputMethod, setInputMethod] = useState('paste')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisComplete, setAnalysisComplete] = useState(false)

    const handleAnalyze = () => {
        setIsAnalyzing(true)
        setTimeout(() => {
            setIsAnalyzing(false)
            setAnalysisComplete(true)
        }, 1500)
    }

    const handleReset = () => {
        setResumeInput('')
        setJobInput('')
        setJobUrl('')
        setAnalysisComplete(false)
    }



    return (
        <>
            {!analysisComplete ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ResumeUploader resumeInput={resumeInput} setResumeInput={setResumeInput} />
                        <JobInput
                            jobInput={jobInput}
                            setJobInput={setJobInput}
                            jobUrl={jobUrl}
                            setJobUrl={setJobUrl}
                            inputMethod={inputMethod}
                            setInputMethod={setInputMethod}
                        />
                    </div>

                    <div className="flex justify-center mt-8">
                        <LoaderButton
                            loading={isAnalyzing}
                            onClick={handleAnalyze}
                            disabled={!resumeInput || (!jobInput && !jobUrl)}
                        >
                            Analyze Resume
                        </LoaderButton>
                    </div>
                </>
            ) : (
                <div className="text-center py-24">
                    <h2 className="text-2xl font-bold mb-4 text-slate-800">Mock Analysis Complete 🎯</h2>
                    <p className="text-slate-600">You can now display your detailed report here.</p>
                    <button
                        onClick={handleReset}
                        className="mt-6 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300"
                    >
                        Analyze Another Resume
                    </button>
                </div>
            )}
        </>
    );
}

export default UploadPage