from fastapi import APIRouter
from database.db import SessionLocal
from database.models import ActionItem

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.get("/")
def get_tasks():

    db = SessionLocal()

    tasks = db.query(ActionItem).all()

    result = []

    for task in tasks:
        result.append({
            "task": task.task,
            "owner": task.owner,
            "deadline": task.deadline,
            "status": task.status
        })

    db.close()

    return result