import { useState } from 'react'
import { Container, Jumbotron, Row, Col, Form, Button } from 'react-bootstrap'
import styles from './QueueCreate.module.css'
import sample from '../images/sample.png'
import client from '../client/client.js'

function QueueCreate() {

    const [roomTitle, setRoomTitle] = useState(null)
    const [topics, setTopics] = useState([''])
    const [removeFlag, setRemoveFlag] = useState(false)
    const [queue, setQueue] = useState(null)

    const makeRoom = () => {
        if (!queue) {
            client.makeRoom(roomTitle, topics)
                .then(queue => {
                    setQueue(queue)
                })
        }
    }

    const removeTopic = () => {
        if (topics.length === 1) {
            setRemoveFlag(true)
        } else {
            setTopics(topics.slice(0, topics.length - 1))
        }
    }

    const addTopic = () => {
        setTopics([...topics, ''])
        setRemoveFlag(false)
    }

    const roomReady = () => {
        return roomTitle && topics.some(t => t)
    }

    return (
        <main className={styles.content}>
            <Container fluid className={styles.container}>
                <Jumbotron className={styles.jumbo}>
                    <Row className={styles.titlerow}>
                        <Col lg={{ span: 5 }}>
                            <section className={styles.title}>
                                <h1>TutroLink</h1>
                                <span>Ad-hoc Office Hours</span>
                            </section>
                        </Col>
                        <Col lg={{ span: 7 }}>
                            <img src={sample} alt="project sample" className={styles.sample} />
                        </Col>
                    </Row>
                </Jumbotron>
                { queue && (
                    <Row className={styles.formrow}>
                        <Col>
                            <section className={styles.links}>
                                <h4>Successfully generated Queue:</h4>
                                <a href={queue.student_link} target="_blank" rel="noreferrer">Access as Attendee</a>
                                <a href={queue.tutor_link} target="_blank" rel="noreferrer">Access as Answerer</a>
                            </section>
                        </Col>
                    </Row>
                )}
                <Row className={styles.formrow}>
                    <Col>
                        <Form.Group>
                            <Form.Label>Room Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter room title" 
                                onChange={e => setRoomTitle(e.target.value)} />
                            <Form.Text className="text-muted">
                            Take care! This information cannot be changed after your room has been created.
                            </Form.Text>
                        </Form.Group>
                        <Row className={styles.buttons}>
                            <Col>
                                <Button variant='success' onClick={makeRoom} disabled={!roomReady()}>
                                    Make Room
                                </Button>
                            </Col>
                            <Col>
                                <Button variant='secondary' onClick={removeTopic}>Remove Topic</Button>
                                { removeFlag && (<Form.Text className="text-muted">
                                    Cannot have less than 1 topic!
                                </Form.Text>)}
                            </Col>
                            <Col>
                                <Button variant='primary' onClick={addTopic}>Add Topic</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        { topics.map((topic, idx) => (
                            <Form.Group key={`topic${idx}`}>
                                <Form.Label>{`Topic #${idx+1}`}</Form.Label>
                                <Form.Control type="text" 
                                    placeholder={`Enter topic #${idx+1}`}
                                    value={topic}
                                    onChange={e => setTopics(topics.map((t, i) =>
                                        (i === idx) ? e.target.value : t
                                    ))} />
                            </Form.Group>
                        ))}
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default QueueCreate