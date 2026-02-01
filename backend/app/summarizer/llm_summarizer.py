import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash-lite")

def summarize_papers(papers):
    """
    papers: list of dictionaries with keys: title, summary
    """

    content = ""
    for paper in papers:
        content += f"Title: {paper['title']}\n"
        content += f"Abstract: {paper['summary']}\n\n"

    prompt = f"""
You are an AI research assistant.

Read the following AI research paper abstracts and produce:
1. A short overall summary (5-6 lines)
2. Key themes or trends (bullet points)
3. Why this matters for software engineers

Use simple, clear language. Avoid academic jargon.

PAPERS:
{content}
"""
    
    response = model.generate_content(prompt)
    return response.text