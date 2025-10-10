import { useState } from 'react'
import Header from './components/Header'
import JobScanMVP from './page/jobscan/JobScanPage'
import UploadPage from './page/upload/upload_component'


function App() {
  const [activeTab, setActiveTab] = useState('scan')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'scan' && (
          <UploadPage></UploadPage>
        )}

        {activeTab === 'tracker' && (
          <JobScanMVP></JobScanMVP>

        )}
      </main>
      {/* Footer always at the bottom */}
      {/* <footer className="text-center text-sm text-slate-500 py-3 border-t border-slate-200">
        © Copyright Saugat Timilsina 2025
      </footer> */}
    </div>
  )
}

export default App
