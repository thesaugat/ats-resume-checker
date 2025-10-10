from fastapi import FastAPI, UploadFile, File, Form, HTTPException, APIRouter
from pydantic import BaseModel
from typing import Optional
from .models import UploadRequest
from .utils.upload_processor import UploadProcessor
from dotenv import load_dotenv

router = APIRouter(prefix="")


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

    return {
        "status": "success",
        "message": "Uploaded and processed successfully",
        **processed_data,
    }
