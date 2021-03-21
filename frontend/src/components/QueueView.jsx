import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { DateTime, Duration } from 'luxon'
import { useCookies } from 'react-cookie'
import styles from './QueueView.module.css'
import EstimatedTime from './EstimatedTime.jsx'
import TitleCard from './TitleCard.jsx'
import QueueControl from './QueueControl.jsx'
import TAView from './TAView.jsx'
import MeetingView from './MeetingView.jsx'
import StudentView from './StudentView.jsx'
import QuestionModal from './QuestionModal.jsx'
import AnswerModal from './AnswerModal.jsx'
import ModifyModal from './ModifyModal.jsx'
import FeedbackModal from './FeedbackModal.jsx'
import client from '../client/client.js'
import { animationInterval } from '../lib/animationInterval.js'

const UPDATE_INTERVAL_SEC = 30

function QueueView({ student, session, id }) {
    const [isLoading, setIsLoading] = useState(true)
    const [inQueue, setInQueue] = useState(false)
    const [questionModalOpen, setQuestionModalOpen] = useState(false)
    const [answerModalOpen, setAnswerModalOpen] = useState(false)
    const [modifyModalOpen, setModifyModalOpen] = useState(false)
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
    const openQuestionModal = () => setQuestionModalOpen(true)
    const openAnswerModal = () => setAnswerModalOpen(true)
    const openModifyModal = () => setModifyModalOpen(true)
    const openFeedbackModal = () => setFeedbackModalOpen(true)
    const closeQuestionModal = () => setQuestionModalOpen(false)
    const closeAnswerModal = () => setAnswerModalOpen(false)
    const closeModifyModal = () => setModifyModalOpen(false)
    const closeFeedbackModal = () => setFeedbackModalOpen(false)
    const [activeMeeting, setActiveMeeting] = useState(null)
    const recieveInvite = () => setActiveMeeting(true)
    const endMeeting = () => setActiveMeeting(false)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [queue, setQueue] = useState(null)
    const [me, setMe] = useState(null)
    const [cookies, setCookie] = useCookies(['id', 'student'])
    const [rating, setRating] = useState(null)
    const [note, setNote] = useState(null)

    const updateThreshold = Duration.fromObject({ seconds: 10 })

    const update = () => {
        client.getRoom(session).then(queue => {
            setQueue(queue)
            setIsLoading(false)
        })   
    }

    useEffect(() => {
        const controller = new AbortController()
        animationInterval(UPDATE_INTERVAL_SEC * 1000, controller.signal, _ => update())
        return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setIsLoading, setQueue, setLastUpdated, setActiveMeeting, session])

    useEffect(() => {
        setLastUpdated(DateTime.now())
    }, [setLastUpdated, queue])

    useEffect(() => {
        update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

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
                            taCount={queue.Tutors.length}
                            startTime={DateTime.fromISO(queue.Start)}
                            endTime={DateTime.fromISO(queue.End)}
                        />
                        <QueueControl
                            inQueue={inQueue}
                            openQuestionModal={openQuestionModal}
                            openAnswerModal={openAnswerModal}
                            openModifyModal={openModifyModal}
                            openFeedbackModal={openFeedbackModal}
                            me={me}
                            session={session}
                            setQueue={setQueue}
                            setMe={setMe}
                            setInQueue={setInQueue}
                            setLastUpdated={setLastUpdated}
                            student={student}
                        />
                    </Col>
                </Row>
                <Row className={styles.listview}>
                    <Col lg={{span: 4}}>
                        <TAView tas={queue.Tutors} />
                    </Col>
                    <Col lg={{span: 6}}>
                        { activeMeeting && <MeetingView 
                            me = {me}
                            taName={activeMeeting.taName}
                            taContactLink={activeMeeting.taContactLink}
                            setActiveMeeting={setActiveMeeting}
                        /> }
                        <StudentView queue={queue.Queue?.filter(student => student.active)} me={me} />
                    </Col>
                </Row>
            </Container>
            <QuestionModal
                modalOpen={questionModalOpen}
                closeModal={closeQuestionModal}
                questions={queue.Topics}
                setInQueue={setInQueue}
                setQueue={setQueue}
                sessionId={session}
                studentId={id}
                setMe={setMe}
                setCookie={setCookie}
            />
            <AnswerModal
                modalOpen={answerModalOpen}
                closeModal={closeAnswerModal}
                questions={queue.Topics}
                setInQueue={setInQueue}
                setQueue={setQueue}
                sessionId={session}
                auth={id}
                setMe={setMe}
                setCookie={setCookie}
            />
            <ModifyModal
                modalOpen={modifyModalOpen}
                closeModal={closeModifyModal}
                questions={queue.Topics}
                setInQueue={setInQueue}
                setQueue={setQueue}
                sessionId={session}
                auth={id}
                setMe={setMe}
                setCookie={setCookie}
                cookies = {cookies}
            />
            <FeedbackModal
                modalOpen={feedbackModalOpen}
                closeModal={closeFeedbackModal}
                questions={queue.Topics}
                setInQueue={setInQueue}
                setQueue={setQueue}
                sessionId={session}
                rating={rating}
                setRating={setRating}
                student_id={id}
                auth={id}
                setMe={setMe}
                setCookie={setCookie}
                cookies = {cookies}
            />
        </main>
    )
}

export default QueueView