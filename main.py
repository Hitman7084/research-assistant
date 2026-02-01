from app.sources.arxiv_client import fetch_arxiv_papers
from app.processing.cleaner import clean_papers

papers = fetch_arxiv_papers(category="cs.AI", max_results=5)
cleaned = clean_papers(papers)

for paper in cleaned:
    print(paper["title"])
    print(paper["summary"][:200])
    print("-" * 50)