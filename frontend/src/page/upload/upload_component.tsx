import React from "react";
import { useState, useEffect, useRef } from 'react'
import ResumeUploader from './components/ResumeUploader'
import JobInput from './components/JobInput'
import LoaderButton from './components/LoaderButton'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface UploadPageProps {
    onAnalysisComplete: (data: any) => void;
    onNavigate: (path: string) => void;
}

type LoadingStage = 'uploading' | 'resume' | 'job' | 'matching' | 'complete'

interface LoadingState {
    stage: LoadingStage
    message: string
    progress: number
}

const loadingStages: Record<LoadingStage, LoadingState> = {
    uploading: { stage: 'uploading', message: 'Uploading files...', progress: 15 },
    resume: { stage: 'resume', message: 'Analyzing resume...', progress: 40 },
    job: { stage: 'job', message: 'Analyzing job description...', progress: 65 },
    matching: { stage: 'matching', message: 'Matching skills & generating recommendations...', progress: 90 },
    complete: { stage: 'complete', message: 'Analysis complete!', progress: 100 }
}

function UploadPage({ onAnalysisComplete, onNavigate }: UploadPageProps) {
    const [resumeInput, setResumeInput] = useState('')
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [jobInput, setJobInput] = useState('')
    const [jobUrl, setJobUrl] = useState('')
    const [inputMethod, setInputMethod] = useState('paste')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loadingState, setLoadingState] = useState<LoadingState>(loadingStages.uploading)
    const [completedStages, setCompletedStages] = useState<Set<LoadingStage>>(new Set())

    const timeoutsRef = useRef<number[]>([])
    const analysisCompleteRef = useRef(false)

    // Clear all timeouts when component unmounts or analysis completes
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
        }
    }, [])

    const handleAnalyze = async () => {
        setIsAnalyzing(true)
        setError(null)
        setLoadingState(loadingStages.uploading)
        setCompletedStages(new Set())
        analysisCompleteRef.current = false

        // Clear any existing timeouts
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
        timeoutsRef.current = []

        // Set up staged loading messages
        const timeout1 = setTimeout(() => {
            if (!analysisCompleteRef.current) {
                setCompletedStages(prev => new Set([...prev, 'uploading']))
                setLoadingState(loadingStages.resume)
            }
        }, 10000) // 10 seconds

        const timeout2 = setTimeout(() => {
            if (!analysisCompleteRef.current) {
                setCompletedStages(prev => new Set([...prev, 'resume']))
                setLoadingState(loadingStages.job)
            }
        }, 35000) // 10 + 25 seconds

        const timeout3 = setTimeout(() => {
            if (!analysisCompleteRef.current) {
                setCompletedStages(prev => new Set([...prev, 'job']))
                setLoadingState(loadingStages.matching)
            }
        }, 60000) // 10 + 25 + 25 seconds

        timeoutsRef.current = [timeout1, timeout2, timeout3]

        try {
            const formData = new FormData()

            // Handle resume - either text or file
            if (resumeFile) {
                formData.append('resume_file', resumeFile)
                formData.append('resume_text', '')
            } else {
                formData.append('resume_text', resumeInput)
                formData.append('resume_file', '')
            }

            // Handle job description - either URL or text
            if (inputMethod === 'url' && jobUrl) {
                formData.append('job_desc', '')
                formData.append('is_job_desc_link', 'true')
                formData.append('job_url', jobUrl)
            } else {
                formData.append('job_desc', jobInput)
                formData.append('is_job_desc_link', 'false')
            }

            const response = await fetch('http://0.0.0.0:8000/upload', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            console.log(data)

            // Mark analysis as complete
            analysisCompleteRef.current = true

            // Clear all pending timeouts
            timeoutsRef.current.forEach(timeout => clearTimeout(timeout))

            // Show completion state briefly
            setLoadingState(loadingStages.complete)
            setCompletedStages(new Set(['uploading', 'resume', 'job', 'matching', 'complete']))

            // Navigate after a brief moment
            setTimeout(() => {
                onAnalysisComplete(data)
            }, 800)

        } catch (err) {
            analysisCompleteRef.current = true
            timeoutsRef.current.forEach(timeout => clearTimeout(timeout))

            const errorMessage = err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.'
            setError(errorMessage)
            console.error('Analysis error:', err)
            setIsAnalyzing(false)
        }
    }

    return (
        <>
            {!isAnalyzing ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ResumeUploader
                            resumeInput={resumeInput}
                            setResumeInput={setResumeInput}
                            resumeFile={resumeFile}
                            setResumeFile={setResumeFile}
                        />
                        <JobInput
                            jobInput={jobInput}
                            setJobInput={setJobInput}
                            jobUrl={jobUrl}
                            setJobUrl={setJobUrl}
                            inputMethod={inputMethod}
                            setInputMethod={setInputMethod}
                        />
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex justify-center mt-8">
                        <LoaderButton
                            loading={false}
                            onClick={handleAnalyze}
                            disabled={(!resumeInput && !resumeFile) || (inputMethod === 'url' ? !jobUrl : !jobInput)}
                        >
                            Analyze Resume
                        </LoaderButton>
                    </div>
                </>
            ) : (
                <div className="max-w-2xl mx-auto mt-12">
                    <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            Analyzing Your Resume
                        </h2>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${loadingState.progress}%` }}
                                />
                            </div>
                            <div className="text-center mt-2 text-sm text-slate-600">
                                {loadingState.progress}%
                            </div>
                        </div>

                        {/* Loading Stages */}
                        <div className="space-y-4">
                            {/* Uploading */}
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50">
                                {completedStages.has('uploading') ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                ) : loadingState.stage === 'uploading' ? (
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <p className={`font-medium ${completedStages.has('uploading') ? 'text-green-700' :
                                            loadingState.stage === 'uploading' ? 'text-blue-700' : 'text-slate-400'
                                        }`}>
                                        Uploading files
                                    </p>
                                    {completedStages.has('uploading') && (
                                        <p className="text-sm text-green-600">Upload complete</p>
                                    )}
                                </div>
                            </div>

                            {/* Resume Analysis */}
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50">
                                {completedStages.has('resume') ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                ) : loadingState.stage === 'resume' ? (
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <p className={`font-medium ${completedStages.has('resume') ? 'text-green-700' :
                                            loadingState.stage === 'resume' ? 'text-blue-700' : 'text-slate-400'
                                        }`}>
                                        Analyzing resume
                                    </p>
                                    {completedStages.has('resume') && (
                                        <p className="text-sm text-green-600">Resume analyzed</p>
                                    )}
                                </div>
                            </div>

                            {/* Job Analysis */}
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50">
                                {completedStages.has('job') ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                ) : loadingState.stage === 'job' ? (
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <p className={`font-medium ${completedStages.has('job') ? 'text-green-700' :
                                            loadingState.stage === 'job' ? 'text-blue-700' : 'text-slate-400'
                                        }`}>
                                        Analyzing job description
                                    </p>
                                    {completedStages.has('job') && (
                                        <p className="text-sm text-green-600">Job analyzed</p>
                                    )}
                                </div>
                            </div>

                            {/* Matching */}
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50">
                                {completedStages.has('matching') ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                                ) : loadingState.stage === 'matching' ? (
                                    <Loader2 className="w-6 h-6 text-blue-500 animate-spin flex-shrink-0" />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                    <p className={`font-medium ${completedStages.has('matching') ? 'text-green-700' :
                                            loadingState.stage === 'matching' ? 'text-blue-700' : 'text-slate-400'
                                        }`}>
                                        Matching skills & generating recommendations
                                    </p>
                                    {completedStages.has('matching') && (
                                        <p className="text-sm text-green-600">Matching complete</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Current Status Message */}
                        <div className="mt-8 text-center">
                            <p className="text-lg font-medium text-blue-700">
                                {loadingState.message}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default UploadPage