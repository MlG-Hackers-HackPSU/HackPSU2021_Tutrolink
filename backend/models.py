from pydantic import BaseModel
from typing import (Optional,List)

class Review(BaseModel):
    Rating: int
    Comment: str


class Student(BaseModel):
    name: str
    question: str
    student_id: str
    joined_queue_time: str
    active: bool = True
    left_queue_time: Optional[str] 


class Tutor(BaseModel):
    ID: str
    Name: str = "Socrates"
    Reviews : List[Review] = []
    StartTime: str
    Active: bool = True
    contact_link : str
    EndTime: Optional[str]
    
class Meeting(BaseModel):
    Tutor: Tutor
    Student: Student
    Topic: str
    StartTime: str
    Active: bool = False
    EndTime: str

class Session(BaseModel):
    ID: str
    SessionName : str = "Save DaBaby in Minecraft"
    Topics: List[str]
    Tutors: List[Tutor] = []
    Queue: List[Student] = []
    Meetings: List[Meeting] = []
    Start: str
    End: str
    SID: str
    TID: str
    tutor_link: str
    student_link: str

class TutorRequest(BaseModel):
    name: str
    contact_link: str
    session: str
    auth: str

class TutorLeaveRequest(BaseModel):
    session_id: str
    tutor_id: str

class StudentRequest(BaseModel):
    session_id: str
    sid: str
    question: str

class SessionRequest(BaseModel):
    start : str
    end : str
    room_title : str
    questions : List[str]

class UpdateRequest(BaseModel):
    session : str
    auth : str
    ID : str
    contact_link : str

class StudentLeaveRequest(BaseModel):
    session_id: str
    student_id: str