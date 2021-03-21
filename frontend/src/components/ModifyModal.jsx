import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import client from '../client/client.js'

function ModifyModal({ modalOpen, closeModal, 
    setInQueue, setQueue, sessionId, auth, ID, cookies }) {


        const[name, setName] =  useState(null)
        const[link, setLink] = useState(null)

    const ask = () => {
        client.taUpdate(sessionId, auth,cookies.id,link).then(queue => {
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
                <Modal.Title>Please Enter Your Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
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

export default ModifyModal