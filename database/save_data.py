from database.db import SessionLocal

from database.models import (
    Meeting,
    Transcript,
    Summary,
    ActionItem,
    KeyDecision,
    OpenQuestion
)


def save_to_database(result, source):

    db = SessionLocal()

    try:

        meeting = Meeting(
            title=result["title"],
            source_file=source
        )

        db.add(meeting)
        db.commit()
        db.refresh(meeting)

        meeting_id = meeting.meeting_id

        transcript = Transcript(
            meeting_id=meeting_id,
            transcript_text=result["transcript"]
        )

        db.add(transcript)

        summary = Summary(
            meeting_id=meeting_id,
            summary_text=result["summary"]
        )

        db.add(summary)

        decisions = result["key_decisions"]

        if isinstance(decisions, list):

            for decision in decisions:

                db.add(
                    KeyDecision(
                        meeting_id=meeting_id,
                        decision_text=str(decision)
                    )
                )

        else:

            db.add(
                KeyDecision(
                    meeting_id=meeting_id,
                    decision_text=str(decisions)
                )
            )

        questions = result["open_questions"]

        if isinstance(questions, list):

            for question in questions:

                db.add(
                    OpenQuestion(
                        meeting_id=meeting_id,
                        question_text=str(question)
                    )
                )

        else:

            db.add(
                OpenQuestion(
                    meeting_id=meeting_id,
                    question_text=str(questions)
                )
            )

        for item in result["action_items"]:

            task = ActionItem(
                meeting_id=meeting_id,
                task=item.get("task", ""),

                owner_name=item.get(
                    "owner",
                    "Unassigned"
                ),

                deadline=item.get(
                    "deadline",
                    ""
                ),

                priority=item.get(
                    "priority",
                    "Medium"
                ),

                status=item.get(
                    "status",
                    "Pending"
                )
            )

            db.add(task)

        db.commit()

        print("✅ Meeting saved to PostgreSQL")

    except Exception as e:

        db.rollback()

        print("❌ Database Error")
        print(e)

    finally:

        db.close()
