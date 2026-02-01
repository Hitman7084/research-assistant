from fastapi import APIRouter, Query
from datetime import datetime

from app.processing.cleaner import clean_papers
from app.sources.arxiv_client import fetch_arxiv_papers
from app.summarizer.llm_summarizer import summarize_papers

router = APIRouter()

@router.get("/digest")
def get_digest(
    category: str = Query(default="cs.AI", description="arXiv category")
):
    papers = fetch_arxiv_papers(category=category, max_results=10)
    cleaned = clean_papers(papers)

    summary = summarize_papers(cleaned)

    return {
        "category": category,
        "summary": summary,
        "generated_at": datetime.today().isoformat()
    }