import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { DateTime, Duration } from 'luxon'
import styles from './QueueView.module.css'
import EstimatedTime from './EstimatedTime.jsx'
import TitleCard from './TitleCard.jsx'
import QueueControl from './QueueControl.jsx'
import TAView from './TAView.jsx'
import MeetingView from './MeetingView.jsx'
import StudentView from './StudentView.jsx'
import QuestionModal from './QuestionModal.jsx'
import client from '../client/client.js'
import { animationInterval } from '../lib/animationInterval.js'

const UPDATE_INTERVAL_SEC = 30

function QueueView({ student, session, id }) {
    const [isLoading, setIsLoading] = useState(true)
    const [inQueue, setInQueue] = useState(false)
    const [questionModalOpen, setQuestionModalOpen] = useState(false)
    const openQuestionModal = () => setQuestionModalOpen(true)
    const closeQuestionModal = () => setQuestionModalOpen(false)
    const [activeMeeting, setActiveMeeting] = useState(null)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [queue, setQueue] = useState(null)
    const [me, SetMe] = useState(null)

    const updateThreshold = Duration.fromObject({ seconds: 10 })

    const update = () => {
        client.getRoom(session).then(queue => {
            setQueue(queue)
            setLastUpdated(DateTime.now())
            setIsLoading(false)
        })
    }


    useEffect(() => {
        const controller = new AbortController()
        animationInterval(UPDATE_INTERVAL_SEC * 1000, controller.signal, _ => update())
        return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setIsLoading, setQueue, setLastUpdated, setActiveMeeting, session])

    if (isLoading) {
        return (
            <main className={styles.content}>
                <section className={styles.spinner}>
                    <Spinner size="lg" animation="border" variant="secondary" />
                </section>
            </main>
        )
    }

    return (
        <main className={styles.content}>
            <Container fluid className={styles.container}>
                <Row className={styles.headerrow}>
                    <Col lg={{span: 4}}>
                        <EstimatedTime
                            estimatedDuration={Duration.fromObject({ minutes: 33 })}
                            lastUpdated={lastUpdated}
                            updateThreshold={updateThreshold}
                            update={update}
                        />
                    </Col>
                    <Col lg={{span: 8}}>
                        <TitleCard 
                            title={queue.SessionName}
                            taCount={3}
                            startTime={DateTime.fromISO(queue.Start)}
                            endTime={DateTime.fromISO(queue.End)}
                        />
                        <QueueControl
                            inQueue={inQueue}
                            openQuestionModal={openQuestionModal} 
                        />
                    </Col>
                </Row>
                <Row className={styles.listview}>
                    <Col lg={{span: 4}}>
                        <TAView tas={queue.Tutors} />
                    </Col>
                    <Col lg={{span: 8}}>
                        { activeMeeting && <MeetingView 
                            name={activeMeeting.name} 
                            taName={activeMeeting.taName}
                            taContactLink={activeMeeting.taContactLink}
                        /> }
                        <StudentView queue={queue.Queue} me={me} />
                    </Col>
                </Row>
            </Container>
            <QuestionModal
                modalOpen={questionModalOpen}
                closeModal={closeQuestionModal}
                questions={queue.Topics}
                setInQueue={setInQueue}
            />
        </main>
    )
}

export default QueueView