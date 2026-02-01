from app.sources.arxiv_client import fetch_arxiv_papers

papers = fetch_arxiv_papers(category="cs.AI", max_results=5)

for paper in papers:
    print(paper["title"])
    print(paper["summary"][:200])
    print("=" * 50)