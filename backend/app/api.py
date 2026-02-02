from fastapi import APIRouter, Query
from datetime import datetime

from app.processing.cleaner import clean_papers
from app.sources.arxiv_client import fetch_arxiv_papers
from app.summarizer.llm_summarizer import summarize_papers
from app.cache import get_cached, set_cache

router = APIRouter()

@router.get("/digest")
def get_digest(
    category: str = Query(default="cs.AI", description="arXiv category")
):
    # Check cache first
    cached_result = get_cached(category)
    if cached_result:
        return cached_result
    
    # If not cached, fetch and process
    papers = fetch_arxiv_papers(category=category, max_results=10)
    cleaned = clean_papers(papers)

    summary = summarize_papers(cleaned)

    result = {
        "category": category,
        "summary": summary,
        "generated_at": datetime.now().isoformat()
    }
    
    # Cache the result
    set_cache(category, result, ttl_hours=6)
    
    return result