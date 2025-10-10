from typing import List
from pydantic import BaseModel
from enum import Enum


class RecommendationType(str, Enum):
    critical = "critical"
    important = "important"
    moderate = "moderate"
    info = "info"


class ImpactLevel(str, Enum):
    High = "High"
    Medium = "Medium"
    Low = "Low"


class Recommendation(BaseModel):
    type: RecommendationType
    title: str
    description: str
    impact: ImpactLevel


class Suggestion(BaseModel):
    section: str
    original: str
    suggested: str
    action: str  # could be enum


class Resume(BaseModel):
    name: str
    title: str
    experience: str
    location: str
    skills: List[str]


class Job(BaseModel):
    title: str
    company: str
    location: str
    type: str
    postedDate: str
    requiredSkills: List[str]


class ChartData(BaseModel):
    name: str
    value: int
    fill: str = None  # optional for some charts


class Analysis(BaseModel):
    overallScore: int
    atsScore: int
    skillsMatched: int
    skillsTotal: int
    keywordsFound: int
    missingSkills: List[str]
    matchedSkills: List[str]
    recommendations: List[Recommendation]
    suggestions: List[Suggestion]


class MyResponse(BaseModel):
    resume: Resume
    job: Job
    analysis: Analysis
    charts: dict  # Can further type all chart sub-objects


# ---------------------------
# Pydantic model for request
# ---------------------------
class UploadRequest(BaseModel):
    job_desc: str
    is_job_desc_link: bool = False
