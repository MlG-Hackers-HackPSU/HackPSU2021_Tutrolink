import { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function QuestionModal({ modalOpen, closeModal, questions }) {

    const [question, setQuestion] = useState(questions[0])
    const [name, setName] = useState(null)
    console.log({question,name})
    const ask = () => {
        console.log(`Asking question ${question}!`)
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