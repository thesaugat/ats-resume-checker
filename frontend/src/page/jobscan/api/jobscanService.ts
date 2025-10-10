// // src/components/JobScanMVP/api/jobscanService.js

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"; // configurable

// // Fetch job scan analysis data
// export async function fetchJobScanData(jobId) {
//     try {
//         const response = await fetch(`${API_BASE_URL}/api/analysis/${jobId}`);
//         if (!response.ok) throw new Error("Failed to fetch job scan data");
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching job scan data:", error);
//         return null;
//     }
// }

// API service ready for future use
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_BASE = "http://localhost:8000";

export type JobScanApiResponse = {
    resume: any;
    job: any;
    analysis: any;
};

export async function fetchJobScanData(jobId: string): Promise<JobScanApiResponse | null> {
    try {
        const res = await fetch(`${API_BASE}/api/analysis/${jobId}`);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        return data as JobScanApiResponse;
    } catch (err) {
        console.error("fetchJobScanData error:", err);
        return null;
    }
}

