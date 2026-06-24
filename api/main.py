from fastapi import FastAPI

from api.routers import meetings
from api.routers import tasks
from api.routers import analytics

app = FastAPI(
    title="AI Meeting Assistant API"
)

app.include_router(meetings.router)
app.include_router(tasks.router)
app.include_router(analytics.router)