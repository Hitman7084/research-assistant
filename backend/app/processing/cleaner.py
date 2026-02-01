def clean_papers(papers):
    cleaned = []
    
    for paper in papers:
        summary = paper["summary"].replace("\n", " ").strip()

        if len(summary) < 200:
            continue

        cleaned.append({
            "title": paper["title"],
            "summary": summary,
            "link": paper["link"]
        })

    return cleaned