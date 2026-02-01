from app.sources.arxiv_client import fetch_arxiv_papers
from app.processing.cleaner import clean_papers
from app.summarizer.llm_summarizer import summarize_papers

papers = fetch_arxiv_papers(category="cs.AI", max_results=5)
cleaned = clean_papers(papers)

summary = summarize_papers(cleaned)

print("\n AI reseacrh summary \n")
print(summary)