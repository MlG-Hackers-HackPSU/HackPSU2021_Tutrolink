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
    const [lastUpdated, setLastUpdated] = useState(null)
    const [queue, setQueue] = useState(null)
    const [me, setMe] = useState(null)
    const [rating, setRating] = useState(null)
    const [note, setNote] = useState(null)
    const [cookies, setCookie] = useCookies(['student_id', 'tutor_id'])
    const [estimatedDuration, setEstimatedDuration] = useState(Duration.fromObject({ minutes: 0}))

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

    // Giant update when queue gets updated
    useEffect(() => {
        setLastUpdated(DateTime.now())
        if (queue && student && (me?.student_id || cookies.student_id)) {
            const meetings = queue.Meetings.filter(meeting => 
                meeting.Active && meeting.Student.student_id === (me?.student_id || cookies.student_id))
            if (meetings) {
                setActiveMeeting(meetings[meetings.length - 1])
            }
            
            const students = queue.Queue.filter(student => 
                student.active && student.student_id === (me?.student_id || cookies.student_id))
            if (students.length > 0) {
                setInQueue(true)
                setMe(students[students.length - 1])
            } else {
                setInQueue(false)
            }
        } else if (queue && !student && (me?.ID || cookies.tutor_id)) {
            const meetings = queue.Meetings.filter(meeting => 
                meeting.Active && meeting.Tutor.ID === (me?.ID || cookies.tutor_id))
            if (meetings) {
                setActiveMeeting(meetings[meetings.length - 1])
            }

            const tutors = queue.Tutors.filter(tutor => tutor.ID === (me?.ID || cookies.tutor_id))
            if (tutors.length > 0) {
                setInQueue(tutors[tutors.length - 1].Active)
                setMe(tutors[tutors.length - 1])
            }
        }

        if (queue){
            if (student && me?.student_id) {
                client.getETA(session, me.student_id).then(eta => setEstimatedDuration(Duration.fromObject({ seconds: eta.total_seconds })))
            } else if (queue.Queue.length > 0) {
            // request student last in the queue
            client.getETA(session, queue.Queue[queue.Queue.length - 1].student_id).then(eta => setEstimatedDuration(Duration.fromObject({ seconds: eta.total_seconds })))
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setLastUpdated, queue, setInQueue])

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
                            estimatedDuration={estimatedDuration}
                            lastUpdated={lastUpdated}
                            updateThreshold={updateThreshold}
                            update={update}
                        />
                    </Col>    
                    <Col lg={{span: 8}}>
                        <TitleCard 
                            title={queue.SessionName}
                            taCount={queue.Tutors.filter(tutor => tutor.Active).length}
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
                        <TAView tas={queue.Tutors.filter(ta => ta.Active)} meetings={queue.Meetings} />
                    </Col>
                    <Col lg={{span: 8}}>
                        { (activeMeeting || (!student && inQueue)) && <MeetingView 
                            me={me}
                            activeMeeting={activeMeeting}
                            student={student}
                            setQueue={setQueue}
                            session={session}
                        /> }
                        <StudentView 
                            queue={queue.Queue?.filter(student => student.active)}
                            me={me}
                            showMeet={!student && !activeMeeting}
                            session={session}
                            setQueue={setQueue}
                            setActiveMeeting={setActiveMeeting}
                            student={student}
                        />
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