// Defines the client used to interact with the server
import axios from 'axios'
import { DateTime } from 'luxon'

const DEFAULT_ENDPOINT = process.env.REACT_APP_BACKEND_URI;

class Client {
    constructor(uri=DEFAULT_ENDPOINT) {
        this.uri = uri
    }

    makeRoom(roomTitle, topics) {
        return axios.post(`${this.uri}/sessions`, {
            "start": DateTime.now().toISO(),
            "end": DateTime.now().plus({ hours: 1 }).toISO(),
            "room_title": roomTitle,
            "questions": topics.filter(t => t)
        }).then(response => {
           return response?.data
        })
    }

    getRoom(sessionId) {
        return axios.get(`${this.uri}/sessions/${sessionId}`).then(response => {
            return response?.data
        })
    }

    joinRoom(sessionId, studentId, question) {
        return axios.post(`${this.uri}/student/join`, {
            'session_id': sessionId,
            'sid': studentId,
            'question': question
        }).then(response => response?.data)
    }

    leaveRoom(sessionId, studentId) {
        return axios.post(`${this.uri}/student/leave`, {
            'session_id': sessionId,
            'student_id': studentId
        }).then(response => response?.data)
    }

    taEnter(sessionID, auth, name, link) {
        return axios.post(`${this.uri}/tutor/join`,{
            'name' : name,
            'contact_link' : link,
            'session' : sessionID,
            'auth' : auth
        }).then(response => response?.data)
    }

    deactivateTa(sessionId, tutorId) {
        return axios.post(`${this.uri}/tutor/leave`, {
            'session_id': sessionId,
            'tutor_id': tutorId
        }).then(response => response?.data)
    }

    taUpdate(session_id,auth,ID,link){
        return axios.post(`${this.uri}/tutor/update`,{
            'contact_link' : link,
            'session' : session_id,
            'auth' : auth,
            'ID': ID
        }).then(response => response?.data)
    }
    
    meet(session, studentId, tutorId) {
        return axios.post(`${this.uri}/meetings`, {
            'session_id': session,
            'tutor_id': tutorId,
            'student_id': studentId
        }).then(response => response?.data)
    }

    leaveMeet(session, studentId, tutorId) {
        return axios.post(`${this.uri}/meetings/deactivate`, {
            'session_id': session,
            'tutor_id': tutorId,
            'student_id': studentId
        }).then(response => response?.data)
    }
}

export default (new Client())
