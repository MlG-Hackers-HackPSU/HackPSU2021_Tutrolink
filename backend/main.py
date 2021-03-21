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
from fastapi.middleware.cors import CORSMiddleware
from models import *

frontend_host = os.environ["FRONTEND_URI"]
origins = [ frontend_host ]

app = FastAPI()
client = MongoClient(
    host="database", 
    username=os.environ["MONGO_USERNAME"], 
    password=os.environ["MONGO_PASSWORD"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sessions = client.tutrolink.sessions

def newID(n):
    return secrets.token_urlsafe(n)

@app.post("/sessions")
async def createSession(sessionRequest : SessionRequest):
    id = newID(16)
    sid = newID(5)
    tid = newID(5)
    newSession = Session(
        ID = id, Topics = sessionRequest.questions, SessionName = sessionRequest.room_title,
        Start = sessionRequest.start, End = sessionRequest.end, 
        SID = sid, TID = tid,
        tutor_link = generateTutorLink(id, tid), student_link = generateStudentLink(id, sid),
    )
    sessions.insert_one(dict(newSession))
    return newSession

@app.get("/sessions/{SessionID}")
async def getSession(SessionID : str):
    return getSessionFromId(SessionID)

def getSessionFromId(SessionID :str):
    return Session.parse_obj(sessions.find_one({"ID":SessionID}))

# incoming student, give them session information such as
# queue information, questions stuff like that.
@app.post("/student/join")
async def addStudent(request: StudentRequest):

    name = generateName()
    student = Student(
        name=name, question=request.question, student_id=secrets.token_urlsafe(16),
        joined_queue_time=datetime.now().isoformat()
    ).dict()
    enqueueStudent(request.session_id, student)

    return getSessionFromId(request.session_id)



# outgoing student, leaves all meeting and queue
@app.post("/student/leave")
async def deactivateStudent(request: StudentLeaveRequest):
    left_timestamp = datetime.now().isoformat()
    session = sessions.find_one({ 'ID': request.session_id })
    
    # deactivate student
    for i in range(len(session['Queue'])):
        if request.student_id == session['Queue'][i]['student_id']:
            session['Queue'][i]['active'] = False
            session['Queue'][i]['left_queue_time'] = left_timestamp
    for i in range(len(session['Meetings'])):
        if request.student_id == session['Meetings'][i]['Student']['student_id']:
            session['Meetings'][i]['Active'] = False
            session['Meetings'][i]['EndTime'] = left_timestamp
    # commit changes
    sessions.find_one_and_replace({ 'ID': request.session_id }, session)
    # return updated session
    return getSessionFromId(request.session_id)

# Takes in a student in JSON format, and inserts into 
# the beginning of the session queue denoted by session_id.
def enqueueStudent(session_id, student):
    sessions.find_one_and_update({"ID" : session_id}, {"$push": {"Queue": student}})

# Dequeues a student from the session_id queue.
def dequeueStudent(session_id):
    my_session = Session.parse_obj(sessions.find_one({"ID":session_id}))

    queue = my_session.Queue

    if len(queue) == 0:
        return None
    else:
        popped = queue.pop(0)

    sessions.find_one_and_update({"ID": session_id}, {"$pop": {"Queue": -1}})
    return popped

def getTopics(session_id):
    my_session = Session.parse_obj(sessions.find_one({"ID": session_id}))
    topics = my_session.Topics
    return list(topics)

#Logic for adding a tutor to the session
@app.post("/tutor/join")
async def tutorJoin(request: TutorRequest):
    currentSession = Session.parse_obj(sessions.find_one({"ID":request.session}))
    if (request.auth == currentSession.TID):

        tID = secrets.token_urlsafe(4)

        newTutor = dict(Tutor(ID = tID,Name = request.name,contact_link = request.contact_link,StartTime = datetime.now().isoformat()))

        sessions.find_one_and_update({'ID': request.session}, { '$push': { 'Tutors': newTutor }})

        currentSession = Session.parse_obj(sessions.find_one({"ID":request.session}))

    return currentSession


def sessionExists(session_id):
    if sessions.find_one( { "ID": session_id } ):
        return True
    return False

#creates a link to invite a tutor 
def generateTutorLink(sid, tid):
    return f"{frontend_host}/{sid}/{tid}/tutor/join"
    
#creates a link to invite a tutor 
def generateStudentLink(sid, stid):
    return f"{frontend_host}/{sid}/{stid}/student/join"


@app.get("/getCurrentMeetings/{SessionID}")
async def getCurrentMeetings(SessionID : str):
    currentSession = Session.parse_obj(sessions.find_one({"ID" : SessionID}))
    currentMeetings = currentSession.Meetings
    return dict(currentMeetings)

@app.post("/tutor/leave")
async def deactivateTutor(request: TutorLeaveRequest):
    left_timestamp = datetime.now().isoformat()
    session = sessions.find_one({ 'ID': request.session_id })
    
    # deactivate student
    for i in range(len(session['Tutors'])):
        if request.tutor_id == session['Tutors'][i]['ID']:
            session['Tutors'][i]['Active'] = False
            session['Tutors'][i]['EndTime'] = left_timestamp
    for i in range(len(session['Meetings'])):
        if request.tutor_id == session['Meetings'][i]['Tutor']['ID']:
            session['Meetings'][i]['Active'] = False
            session['Meetings'][i]['EndTime'] = left_timestamp
    # commit changes
    sessions.find_one_and_replace({ 'ID': request.session_id }, session)
    # return updated session
    return getSessionFromId(request.session_id)


@app.post("/tutor/update")
async def updateTutor(request: UpdateRequest):
    session = sessions.find_one({"ID" : request.session})
    if (request.auth == session["TID"]):
        for i in range(len(session['Tutors'])):
            if request.ID == session['Tutors'][i]['ID']:
                session['Tutors'][i]['Active'] = True
                session['Tutors'][i]['StartTime'] = datetime.now().isoformat()
                session['Tutors'][i]['contact_link'] = request.contact_link
                session['Tutors'][i]['EndTime'] = ''
        # commit changes
        sessions.find_one_and_replace({ 'ID': request.session}, session)
    # return updated session
    return getSessionFromId(request.session)

@app.get("/check/{SessionID}/{StudentID}")
async def checkMeetings(SessionID:str,StudentID:str):
    currentSession = sessions.find_one({"ID" : SessionID})
    for i in range(len(currentSession['Meetings'])):
        if(currentSession['Meetings'][i]['Student'][student_id] == StudentID):
            return currentSession['Meetings'][i]
    return False

