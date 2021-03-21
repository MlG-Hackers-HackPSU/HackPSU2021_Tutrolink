import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import client from '../client/client.js'

function QuestionModal({ modalOpen, closeModal, questions, 
    setInQueue, setQueue, sessionId, studentId, setMe, setCookie }) {

    const [question, setQuestion] = useState(questions[0])

    const ask = () => {
        client.joinRoom(sessionId, studentId, question).then(queue => {
            setQueue(queue)
            setInQueue(true)
            // we're the last student in the queue
            const me = queue.Queue[queue.Queue.length - 1]
            setMe(me) 
            setCookie('id', me.student_id)
        })
        closeModal()
    }

    return (
        <Modal show={modalOpen} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Select a Question to ask!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Questions</Form.Label>
                    <Form.Control as="select" onChange={e => setQuestion(e.target.value)}>
                        { questions.map(question => (
                            <option key={question}>{question}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control as="input" onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={ask} disabled={!name}>
                    Join Queue
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default QuestionModal