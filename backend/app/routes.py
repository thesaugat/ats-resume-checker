from fastapi import FastAPI, UploadFile, File, Form, HTTPException, APIRouter, Request
from pydantic import BaseModel
from typing import Optional
from .models import UploadRequest
from .utils.upload_processor import UploadProcessor
from .utils.compile import ResumeJobAnalysisBuilder
from .utils.ml_service import RAGAnalyzerFull, ResumeAnalyzer
import json
import os
from .utils.data import get_dummy_json
from .storage.file_storage import save_analysis, get_total_scans

from dotenv import load_dotenv

router = APIRouter(prefix="")
load_dotenv()


def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    # Check for forwarded IP (if behind proxy/load balancer)
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()

    # Check for real IP header
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip


@router.get("/")
def root():
    return {"message": "Backend running successfully!"}


# ---------------------------
# Upload endpoint
# ---------------------------
@router.post("/upload")
async def upload_file(
    request: Request,
    resume_text: Optional[str] = Form(None),
    resume_file: Optional[UploadFile] = File(None),
    job_desc: str = Form(...),
    is_job_desc_link: bool = Form(False),
):

    if get_total_scans() >= 500:
        raise HTTPException(
            status_code=403, detail="Only 500 free scans available. Limit reached."
        )

    processor = UploadProcessor(resume_text, resume_file, job_desc, is_job_desc_link)
    processed_data = processor.process()

    response_json = process_resume_job(processed_data=processed_data)
    # response_json = get_dummy_json()
    unique_id = save_to_db(
        response_json["resume"]["name"], request, response=response_json
    )

    print(f"Saved analysis: {unique_id}")

    return {**response_json}


def save_to_db(name, request, response):
    client_ip = get_client_ip(request)
    unique_id = save_analysis(json.dumps(response), name=name, ip=client_ip)


def process_resume_job(processed_data):
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    rag = RAGAnalyzerFull(
        resume_text=processed_data["resume_text"],
        job_desc=processed_data["job_desc"],
        vectorstore_path="./vector_store",
        openai_api_key=OPENAI_API_KEY,
    )
    extracted = rag.extract_all_details()
    resume_json = json.loads(extracted["resume"]["result"])
    job_json = json.loads(extracted["job"]["result"])
    analysis_obj = ResumeAnalyzer(
        resume_json=resume_json, job_json=job_json, llm=rag.llm
    )
    analysis_result = analysis_obj.analyze_resume()
    analysis_json = json.loads(analysis_result.content)
    r = ResumeJobAnalysisBuilder(
        resume_details=resume_json, job_details=job_json, analysis_json=analysis_json
    )
    response_json = r.build()
    return response_json


@router.get("/stats")
async def get_stats():
    """Get total number of resumes scanned"""
    total = get_total_scans()
    return {"total_scans": total}


@router.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy", "service": "backend"}
