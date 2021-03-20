from fastapi import FastAPI
from datetime import datetime
import requests
import json
import os
import secrets
from pymongo import MongoClient
from pydantic import BaseModel
from typing import (Optional,List)

app = FastAPI()
client = MongoClient(
    host="database", 
    username=os.environ["MONGO_USERNAME"], 
    password=os.environ["MONGO_PASSWORD"])

frontend_host = os.environ["FRONTEND_URI"]

#Here are the objects that will be sent back and forth

class Review(BaseModel):
    Rating: int
    Comment: str

class Meeting(BaseModel):
    Tutor: str
    Student: str
    Topic: str
    StartTime: datetime


class Tutor(BaseModel):
    ID: str
    Name: str = "Socrates"
    Reviews : List[Review] = []


class Session(BaseModel):
    ID: str
    SessionName : str = "Save DaBaby in Minecraft"
    Topics: List[str]
    Tutors: List[Tutor] = []
    Queue: List[str] = []
    ActiveMeetings: List[Meeting] = []
    Start: str
    End: str
    SID: str
    TID: str

class SessionRequest(BaseModel):
    start : str
    end : str
    room_title : str
    questions : List[str]

sessions = client.tutrolink.sessions

# lol forever counter
@app.get("/")
async def index():
    return "No, don't search me!"


def newID(n):
    return secrets.token_urlsafe(n)


@app.post("/sessions")
async def createSession(sessionRequest : SessionRequest):
    id = newID(16)
    sid = newID(5)
    tid = newID(5)
    newSession = Session(ID = id,Topics = sessionRequest.questions,SessionName = sessionRequest.room_title, Start = sessionRequest.start, End = sessionRequest.end,SID = sid, TID = tid)
    sessions.insert_one(dict(newSession))
    return newSession

@app.get("/sessions")
async def getSession():
    # TODO make this
    pass

    
@app.get("/student/{session_id}/join")
def studentWantsToJoin(session_id):
    if not sessionExists(session_id):
        return "Error: invalid session_id"
    topics = getTopics(session_id)

    # TODO redirect them to fourm with the topics

    return str(topics)

@app.post("/student/{session_id}/join")
def addStudent(student):
    # TODO - Add student to DB.
    return "No Student :("


# Takes in a student in JSON format, and inserts into 
# the beginning of the session queue denoted by session_id.
def enqueueStudent(session_id, student):
    sessions.find_one_and_update({"ID" : int(session_id)}, {"$push": {"Queue": int(student)}})

# Dequeues a student from the session_id queue.
def dequeueStudent(session_id):
    my_session = Session.parse_obj(sessions.find_one({"ID":int(session_id)}))

    queue = my_session.Queue

    if len(queue) == 0:
        return None
    else:
        popped = queue.pop(0)

    sessions.find_one_and_update({"ID": int(session_id)}, {"$pop": {"Queue": -1}})
    return popped

def getTopics(session_id):
    my_session = Session.parse_obj(sessions.find_one({"ID": session_id}))
    topics = my_session.Topics
    return list(topics)

#Logic for adding a tutor to the session
@app.post("/Tutor/{token}/join")
async def tutorJoin(token: str):
    currentSession = Session.parse_obj(sessions.find_one({"ID":token}))
    tID = secrets.token_urlsafe(4)
    newTutor = Tutor(ID = tID).dict()
    sessions.find_one_and_update({'ID': token}, { '$push': { 'Tutors': newTutor }})
    return "200"


def sessionExists(session_id):
    if sessions.find_one( { "ID": int(session_id) } ):
        return True
    return False

#creates a link to invite a tutor 
@app.get("/genTutorLink/{SessionID}")
async def generateTutorLink(SessionID : str):
    tid = Session.parse_obj(sessions.find_one({"ID":SessionID})).TID
    return f"{frontend_host}/{SessionID}/{tid}/tutor/join"

#creates a link to invite a student
@app.get("/genStudentLink/{SessionID}")
async def test(SessionID : str):
    sid = Session.parse_obj(sessions.find_one({"ID":SessionID}))
    sid = sid.SID
    return f"{frontend_host}/{SessionID}/{sid}/join"


@app.get("/getCurrentMeetings/{SessionID}")
async def getCurrentMeetings(SessionID : str):
    currentSession = Session.parse_obj(sessions.find_one({"ID" : SessionID}))
    currentMeetings = currentSession.ActiveMeetings
    return dict(currentMeetings)