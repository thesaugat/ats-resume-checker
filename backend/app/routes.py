from fastapi import FastAPI, UploadFile, File, Form, HTTPException, APIRouter
from pydantic import BaseModel
from typing import Optional
from .models import UploadRequest
from .utils.upload_processor import UploadProcessor
from .utils.compile import ResumeJobAnalysisBuilder
from .utils.ml_service import RAGAnalyzerFull, ResumeAnalyzer
import json
import os
from .utils.data import get_dummy_json

from dotenv import load_dotenv

router = APIRouter(prefix="")
load_dotenv()


@router.get("/")
def root():
    return {"message": "Backend running successfully!"}


# ---------------------------
# Upload endpoint
# ---------------------------
@router.post("/upload")
async def upload_file(
    resume_text: Optional[str] = Form(None),
    resume_file: Optional[UploadFile] = File(None),
    job_desc: str = Form(...),
    is_job_desc_link: bool = Form(False),
):

    processor = UploadProcessor(resume_text, resume_file, job_desc, is_job_desc_link)
    processed_data = processor.process()

    response_json = process_resume_job(processed_data=processed_data)
    # response_json = get_dummy_json()
    return {**response_json}


def process_resume_job(processed_data):
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    rag = RAGAnalyzerFull(
        resume_text=processed_data["resume_text"],
        job_desc=processed_data["job_desc"],
        vectorstore_path="backend/app/vectorstore",
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
