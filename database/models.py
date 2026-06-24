from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class Meeting(Base):
    __tablename__ = "meetings"

    meeting_id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    source_file = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)


class Transcript(Base):
    __tablename__ = "transcripts"

    transcript_id = Column(Integer, primary_key=True, index=True)

    meeting_id = Column(
        Integer,
        ForeignKey("meetings.meeting_id")
    )

    transcript_text = Column(Text)


class Summary(Base):
    __tablename__ = "summaries"

    summary_id = Column(Integer, primary_key=True, index=True)

    meeting_id = Column(
        Integer,
        ForeignKey("meetings.meeting_id")
    )

    summary_text = Column(Text)


class ActionItem(Base):
    __tablename__ = "action_items"

    task_id = Column(Integer, primary_key=True, index=True)

    meeting_id = Column(
        Integer,
        ForeignKey("meetings.meeting_id")
    )

    task = Column(Text)

    owner_name = Column(String(100))

    deadline = Column(String(50))

    priority = Column(String(50))

    status = Column(String(50), default="Pending")


class KeyDecision(Base):
    __tablename__ = "key_decisions"

    decision_id = Column(Integer, primary_key=True, index=True)

    meeting_id = Column(
        Integer,
        ForeignKey("meetings.meeting_id")
    )

    decision_text = Column(Text)


class OpenQuestion(Base):
    __tablename__ = "open_questions"

    question_id = Column(Integer, primary_key=True, index=True)

    meeting_id = Column(
        Integer,
        ForeignKey("meetings.meeting_id")
    )

    question_text = Column(Text)


class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(Integer, primary_key=True)

    full_name = Column(String(100))

    email = Column(String(200))

    department = Column(String(100))


class TaskAssignment(Base):
    __tablename__ = "task_assignments"

    assignment_id = Column(Integer, primary_key=True)

    task_id = Column(
        Integer,
        ForeignKey("action_items.task_id")
    )

    employee_id = Column(
        Integer,
        ForeignKey("employees.employee_id")
    )


class ReminderLog(Base):
    __tablename__ = "reminder_logs"

    reminder_id = Column(Integer, primary_key=True)

    task_id = Column(
        Integer,
        ForeignKey("action_items.task_id")
    )

    sent_at = Column(DateTime, default=datetime.utcnow)
