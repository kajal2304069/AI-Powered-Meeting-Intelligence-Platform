#Actionableitems , decision , questions 

from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser, StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
import os


def get_llm():
    return ChatMistralAI(
        model="mistral-small-latest",
        mistral_api_key=os.getenv("MISTRAL_API_KEY"),
        temperature=0.2
    )


def build_text_chain(system_prompt: str):
    llm = get_llm()

    return (
        RunnablePassthrough()
        | RunnableLambda(lambda x: {"text": x})
        | ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{text}")
        ])
        | llm
        | StrOutputParser()
    )


def build_json_chain(system_prompt: str):
    llm = get_llm()

    return (
        RunnablePassthrough()
        | RunnableLambda(lambda x: {"text": x})
        | ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{text}")
        ])
        | llm
        | JsonOutputParser()
    )


# ---------------------------------------------------
# IMPROVED TASK EXTRACTION
# ---------------------------------------------------

def extract_action_items(transcript: str):

    prompt = """
You are an expert project manager.

Analyze the meeting transcript and identify all actionable tasks.

For each task extract:

1. task
2. owner
3. deadline
4. priority

Rules:

- owner should be the responsible person
- if owner not found use "Unassigned"
- if deadline not found use "Not Specified"
- priority must be:
  High
  Medium
  Low

Return ONLY valid JSON.

Example:

[
    {
        "task":"Build dashboard",
        "owner":"Kajal",
        "deadline":"2026-06-15",
        "priority":"High",
        "status":"Pending"
    },
    {
        "task":"Deploy backend",
        "owner":"Rahul",
        "deadline":"2026-06-18",
        "priority":"Medium",
        "status":"Pending"
    }
]
"""

    chain = build_json_chain(prompt)

    try:
        return chain.invoke(transcript)

    except Exception as e:
        print("Task extraction error:", e)
        return []


# ---------------------------------------------------
# DECISIONS
# ---------------------------------------------------

def extract_key_decisions(transcript: str) -> str:

    chain = build_text_chain(
        """
You are an expert meeting analyst.

Extract all important decisions made during the meeting.

Format as a numbered list.

If none found return:
No key decisions found.
"""
    )

    return chain.invoke(transcript)


# ---------------------------------------------------
# QUESTIONS
# ---------------------------------------------------

def extract_questions(transcript: str) -> str:

    chain = build_text_chain(
        """
Extract all unresolved questions,
risks,
follow-up items,
or discussion points that require future action.

Format as a numbered list.

If none found return:
No open questions found.
"""
    )

    return chain.invoke(transcript)