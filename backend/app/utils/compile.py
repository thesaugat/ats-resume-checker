import json
from typing import Dict, Any, List
from collections import defaultdict


class ResumeJobAnalysisBuilder:
    """
    Utility class to combine resume, job, and analysis data
    into a unified standardized JSON structure for visualization and reporting.
    """

    def __init__(
        self,
        resume_details: Dict[str, Any],
        job_details: Dict[str, Any],
        analysis_json: Dict[str, Any],
    ):
        self.resume = resume_details
        self.job = job_details
        self.analysis = analysis_json

    def build(self) -> Dict[str, Any]:
        """Builds the combined structured JSON."""
        return {
            "resume": self.resume,
            "job": self.job,
            "analysis": self._build_analysis(),
            "charts": self._build_charts(),
        }

    # --------------------------- PRIVATE HELPERS --------------------------- #

    def _build_resume(self) -> Dict[str, Any]:
        return {
            "name": self.resume.get("name"),
            "title": self.resume.get("title"),
            "experience": f"{self.resume.get('experience', '0')}+ years",
            "location": self.resume.get("location"),
            "skills": self.resume.get("skills", []),
        }

    def _build_job(self) -> Dict[str, Any]:
        return {
            "title": self.job.get("title"),
            "company": self.job.get("company"),
            "location": self.job.get("location"),
            "type": self.job.get("type"),
            "postedDate": self.job.get("postedDate"),
            "requiredSkills": self.job.get("requiredSkills", []),
        }

    def _build_analysis(self) -> Dict[str, Any]:
        detailed = self.analysis.get("detailed_analysis", {})
        perf = self.analysis.get("performance_metrics", {})

        return {
            "overallScore": perf.get("match_score", 0),
            "atsScore": perf.get("ats_score", 0),
            "skillsMatched": len(detailed.get("skills_matched", [])),
            "skillsTotal": len(self.job.get("requiredSkills", [])),
            "experience_relevance": detailed.get("experience_relevance"),
            "keywordsFound": sum(k["matched"] for k in detailed.get("keywords", [])),
            "keyword_density": detailed.get("keyword_density", []),
            "missingSkills": detailed.get("skills_missing", []),
            "missing_skills_priority": detailed.get("missing_skills_priority", []),
            "matchedSkills": detailed.get("skills_matched", []),
            "recommendations": self.analysis.get("recommendations", []),
            "strengths": self.analysis.get("strengths", []),
            "redFlags": self.analysis.get("red_flags", []),
        }

    def _build_charts(self) -> Dict[str, Any]:
        perf = self.analysis.get("performance_metrics", {})
        detailed = self.analysis.get("detailed_analysis", {})
        competency = self.analysis.get("competency", [])

        return {
            "radial": [
                {"name": "Match Score", "value": perf.get("match_score", 0)},
                {"name": "ATS Score", "value": perf.get("ats_score", 0)},
                {"name": "Skills", "value": perf.get("skills_score", 0)},
                {"name": "Experience", "value": perf.get("experience_score", 0)},
            ],
            "competency": competency,
            "matchProgress": [
                {"month": "Current", "score": perf.get("match_score", 0)},
                {
                    "month": "With Missing Skills",
                    "score": min(100, perf.get("match_score", 0) + 6),
                },
                {
                    "month": "With All Suggestions",
                    "score": min(100, perf.get("match_score", 0) + 10),
                },
            ],
            "keywords": detailed.get("keywords", []),
            "atsCompatibility": [
                {"name": "Passed", "value": perf.get("ats_score", 0)},
                {"name": "Failed", "value": 100 - perf.get("ats_score", 0)},
            ],
            "skillPriority": self._build_skill_priority(detailed),
        }

    def _build_skill_priority(self, detailed: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Map numeric priority to visual labels/colors."""
        priorities = detailed.get("missing_skills_priority", [])
        if not priorities:
            return []
        priority_counts = {
            1: priorities.count(1),
            2: priorities.count(2),
            3: priorities.count(3),
        }
        return [
            {
                "name": "Critical",
                "value": priority_counts.get(1, 0),
                "color": "#ef4444",
            },
            {
                "name": "Important",
                "value": priority_counts.get(2, 0),
                "color": "#f97316",
            },
            {
                "name": "Nice to Have",
                "value": priority_counts.get(3, 0),
                "color": "#3b82f6",
            },
        ]
