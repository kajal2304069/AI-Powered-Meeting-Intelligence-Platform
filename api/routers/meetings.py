from fastapi import APIRouter
from database.db import SessionLocal
from database.models import Meeting

router = APIRouter(
    prefix="/meetings",
    tags=["Meetings"]
)

@router.get("/")
def get_meetings():

    db = SessionLocal()

    meetings = db.query(Meeting).all()

    data = []

    for m in meetings:
        data.append({
            "id": m.id,
            "title": m.title
        })

    db.close()

    return data