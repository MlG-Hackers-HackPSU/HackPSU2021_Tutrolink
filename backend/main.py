from fastapi import FastAPI
from datetime import datetime
import requests
import json
import os
import secrets
from pymongo import MongoClient
from pydantic import BaseModel
from typing import (Optional,List)
from random import choice
from names import generateName

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

class Student(BaseModel):
    name: str
    question: str


class Tutor(BaseModel):
    ID: str
    Name: str = "Socrates"
    Reviews : List[Review] = []


class Session(BaseModel):
    ID: str
    SessionName : str = "Save DaBaby in Minecraft"
    Topics: List[str]
    Tutors: List[Tutor] = []
    Queue: List[Student] = []
    ActiveMeetings: List[Meeting] = []
    Start: str
    End: str
    SID: str
    TID: str

class TutorRequest(BaseModel):
    name: str
    contact_link: str

class StudentRequest(BaseModel):
    session_id: int
    sid: int
    question: str

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
    return "200"

@app.get("/sessions")
async def getSession():
    # TODO make this
    pass

# incoming student, give them session information such as
# queue information, questions stuff like that.
@app.post("/student/join")
async def addStudent(request: StudentRequest):

    name = generateName()
    student = Student(name=name, question=request.question)
    enqueueStudent(request.session_id, student)
    
    return 200

# Takes in a student in JSON format, and inserts into 
# the beginning of the session queue denoted by session_id.
def enqueueStudent(session_id, student):
    sessions.find_one_and_update({"ID" : int(session_id)}, {"$push": {"Queue": student}})

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

