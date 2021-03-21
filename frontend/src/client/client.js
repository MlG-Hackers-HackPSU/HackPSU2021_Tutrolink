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
        console.log(sessionID)
        console.log(auth)
        console.log(name)
        console.log(link)
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

    getQueueStatus() {
        // TODO
    }
}

export default (new Client())
