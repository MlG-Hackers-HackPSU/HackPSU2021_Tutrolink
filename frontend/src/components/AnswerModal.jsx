import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import client from '../client/client.js'

function AnswerModal({ modalOpen, closeModal, 
    setInQueue, setQueue, sessionId, auth, setMe, setCookie }) {


        const[name, setName] =  useState(null)
        const[link, setLink] = useState(null)

    const ask = () => {
        client.taEnter(sessionId, auth,name,link).then(queue => {
            console.log(queue)
            setQueue(queue)
            setInQueue(true)
            // we're the last student in the queue
            //const me = queue.Queue[queue.Queue.length - 1]
            //setMe(me) 
            //setCookie('id', me.student_id)
        })
        closeModal()
    }

    return (
        <Modal show={modalOpen} onHide={closeModal} >
            <Modal.Header closeButton>
                <Modal.Title>Please Enter Your Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Meeting link (ie: zoom,microsoft teams, etc...)</Form.Label>
                    <Form.Control type="text" onChange={e => setLink(e.target.value)}>
                    </Form.Control>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={ask} disabled={!name && !link}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AnswerModal