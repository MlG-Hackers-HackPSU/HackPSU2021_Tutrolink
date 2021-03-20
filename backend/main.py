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


# Here are the objects that will be sent back and forth
class Tutor(BaseModel):
    ID: str
    Name: str = "Socrates"

#Here are the objects that will be sent back and forth
class Session(BaseModel):
    ID: str
    Topics: List[str]
    Tutors: List[Tutor]
    Queue: List[int]

sessions = client.tutrolink.sessions

# lol forever counter
@app.get("/")
async def index():
    return "No, don't search me!"


def newID():
    return secrets.token_urlsafe(16)


@app.post("/rooms")
async def createSession():
    id = newID()
    newSession = Session(ID = id,Topics = [],Tutors = [],Queue = [])
    sessions.insert_one(dict(newSession))
    return id
    return newSession.ID

    
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
    return


def sessionExists(session_id):
    if sessions.find_one( { "ID": int(session_id) } ):
        return True
    return False