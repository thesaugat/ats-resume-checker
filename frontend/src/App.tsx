import { useState, useEffect } from 'react'
import { Github, Linkedin } from 'lucide-react'
import Header from './components/Header'
import JobScanMVP from './page/jobscan/JobScanPage'
import UploadPage from './page/upload/upload_component'
import ResumeJobComparison from './page/jobscan/sections/JobResumeDetails'

function App() {
  const [currentPath, setCurrentPath] = useState<string>('/upload')
  const [analysisData, setAnalysisData] = useState<any>(null)

  // Initialize route on mount
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/jobscan' || path === '/upload') {
      setCurrentPath(path)
    } else {
      setCurrentPath('/upload')
      window.history.replaceState({}, '', '/upload')
    }
  }, [])

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentPath(path)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Navigation function
  const navigate = (path: string): void => {
    setCurrentPath(path)
    window.history.pushState({}, '', path)
  }

  // Handle analysis completion
  const handleAnalysisComplete = (data: any): void => {
    setAnalysisData(data)
    navigate('/jobscan')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <Header currentPath={currentPath} onNavigate={navigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {currentPath === '/upload' && (
          <UploadPage onAnalysisComplete={handleAnalysisComplete} onNavigate={navigate} />
        )}

        {currentPath === '/jobscan' && (
          <JobScanMVP analysisData={analysisData} onNavigate={navigate} />
        )}

        {currentPath === '/jobResume' && (
          <ResumeJobComparison analysisData={analysisData} onNavigate={navigate} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
            <span>Made by @Saugat Timilsina 2025</span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/thesaugat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/thesaugat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App