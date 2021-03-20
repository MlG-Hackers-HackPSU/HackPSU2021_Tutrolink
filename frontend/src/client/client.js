// Defines the client used to interact with the server

const DEFAULT_ENDPOINT = process.env.REACT_APP_BACKEND_URI;

class Client {
    constructor(host=DEFAULT_ENDPOINT) {
        this.host = host
    }

    joinRoom(roomCode) {
        // TODO
    }

    getQueueStatus() {
        // TODO
    }
}

export default Client
