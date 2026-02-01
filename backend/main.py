from fastapi import FastAPI
from app.api import router

app = FastAPI(
    title="AI research assistant API",
    description="Generates AI research summary from arXiv",
    version="1.0.0"
)

app.include_router(router)