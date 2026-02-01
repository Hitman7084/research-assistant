import feedparser

def fetch_arxiv_papers(category="cs.AI", max_results=10):
    query = (
        "https://export.arxiv.org/api/query?"
        f"search_query=cat:{category}"
        "&sortBy=submittedDate"
        f"&max_results={max_results}"
    )

    feed = feedparser.parse(query)

    papers = []
    for entry in feed.entries:
        papers.append({
            "title": entry.title,
            "summary": entry.summary,
            "published": entry.published,
            "link": entry.link,
        })

    return papers