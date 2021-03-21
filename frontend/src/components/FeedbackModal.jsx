import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import client from '../client/client.js'

function FeedbackModal({ modalOpen, closeModal, 
    setInQueue, setQueue, sessionId, auth, student_id, cookies, rating, setRating, note }) {


        const[name, setName] =  useState(null)
        const[link, setLink] = useState(null)

    const report = () => {
        client.storeFeedback(sessionId, auth,student_id,rating,note).then(queue => {
            console.log(queue)
            setQueue(queue)
            setInQueue(true)
            //we're the last student in the queue
        })
        closeModal()
    }

    return (
        <Modal show={modalOpen} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>How was it?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>any thoughts?</Form.Label>
                    <Form.Control type="text"></Form.Control>
                </Form.Group>
                <Button variant="secondary" onClick={setRating(1)}>
                    1
                </Button>
                <Button variant="secondary" onClick={setRating(2)}>
                    2
                </Button>
                <Button variant="secondary" onClick={setRating(3)}>
                    3
                </Button>
                <Button variant="secondary" onClick={setRating(4)}>
                    4
                </Button>
                <Button variant="secondary" onClick={setRating(5)}>
                    5
                </Button>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    No thanks
                </Button>
                <Button variant="primary" onClick={report} disabled={!rating}>
                    send feedback
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FeedbackModal