from fastapi import UploadFile, HTTPException
from typing import Optional
import requests
from bs4 import BeautifulSoup
import io
from PyPDF2 import PdfReader


class UploadProcessor:
    def __init__(
        self,
        resume_text: Optional[str],
        resume_file: Optional[UploadFile],
        job_desc: str,
        is_job_desc_link: bool,
    ):
        self.resume_text = resume_text
        self.resume_file = resume_file
        self.job_desc = job_desc
        self.is_job_desc_link = is_job_desc_link
        self.job_desc_backup = job_desc  # keep original link if it's a URL

    # ---------------------------
    # Public method to process upload
    # ---------------------------
    def process(self) -> dict:
        self._validate_inputs()
        self._process_job_desc()
        self._process_resume_file()
        return {
            "resume_text": self.resume_text,
            "job_desc": self.job_desc,
            "job_desc_backup": self.job_desc_backup,
        }

    # ---------------------------
    # Private helper methods
    # ---------------------------
    def _validate_inputs(self):
        if not self.resume_text and not self.resume_file:
            raise HTTPException(
                status_code=400,
                detail="Either resume_text or resume_file must be provided.",
            )

    def _process_job_desc(self):
        if self.is_job_desc_link:
            scraped_text = self._scrape_link(self.job_desc)
            if not scraped_text:
                raise HTTPException(
                    status_code=400, detail="Failed to scrape the job description link."
                )
            self.job_desc = scraped_text

    def _process_resume_file(self):
        if self.resume_file and self.resume_file.filename.lower().endswith(".pdf"):
            extracted_text = self._extract_pdf_text(self.resume_file)
            if extracted_text:
                self.resume_text = extracted_text

    @staticmethod
    def _scrape_link(url: str) -> str:
        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            text = " ".join(soup.stripped_strings)
            return text
        except Exception as e:
            print(f"Error scraping URL {url}: {e}")
            return ""

    @staticmethod
    def _extract_pdf_text(file: UploadFile) -> str:
        try:
            pdf_bytes = file.file.read()
            reader = PdfReader(io.BytesIO(pdf_bytes))
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text.strip()
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return ""
