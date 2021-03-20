from fastapi import FastAPI,Response
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


class Tutor(BaseModel):
    ID: str
    Name: str = "Socrates"

#Here are the objects that will be sent back and forth
class Session(BaseModel):
    ID: str
    Topics: List[str]
    Tutors: List[Tutor]
    Queue: List[int]

counters = client.demo.counters

sessions = client.tutrolink.sessions

@app.get("/")
async def index():
    counter = counters.find_one()
    if counter is None:
        counters.insert_one({'num_visited': 1})
    counter = counters.find_one_and_update({}, {'$inc': {'num_visited': 1}})
    return f"This page has been visited {counter['num_visited']} times."


def newID():
    return secrets.token_urlsafe(16)

@app.post("/rooms")
async def createSession():
    id = newID()
    newSession = Session(ID = id,Topics = [],Tutors = [],Queue = [])
    sessions.insert_one(dict(newSession))
    return newSession.ID

#Logic for adding a tutor to the session
@app.post("/Tutor/{token}/join")
async def tutorJoin(token: str):
    currentSession = Session.parse_obj(sessions.find_one({"ID":token}))
    tID = secrets.token_urlsafe(4)
    newTutor = Tutor(ID = tID).dict()
    sessions.find_one_and_update({'ID': token}, { '$push': { 'Tutors': newTutor }})
    return Response(url = "https://www.google/com")


