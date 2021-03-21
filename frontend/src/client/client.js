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

    joinRoom(roomCode) {
        // TODO
    }

    getQueueStatus() {
        // TODO
    }
}

export default (new Client())
