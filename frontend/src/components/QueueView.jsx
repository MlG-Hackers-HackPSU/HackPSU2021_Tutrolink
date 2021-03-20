import { Container, Row, Col } from 'react-bootstrap'
import { DateTime, Duration } from 'luxon'
import styles from './QueueView.module.css'
import EstimatedTime from './EstimatedTime.jsx'
import TitleCard from './TitleCard.jsx'
import QueueControl from './QueueControl.jsx'
import TAView from './TAView.jsx'
import MeetingView from './MeetingView.jsx'
import StudentView from './StudentView.jsx'

function QueueView() {

    const startTime = DateTime.now()
    const endTime = DateTime.now().plus({ hours: 1 })

    const lastUpdated = DateTime.now().minus({ seconds: 21 })
    const updateThreshold = Duration.fromObject({ seconds: 20 })

    const tas = false ? [] : [
        { name: 'Benedict Wong', helping: { name: 'Parker Griep' }, duration: Duration.fromObject({ minutes: 0 }) },
        { name: 'Alan Tudyk', helping: { name: 'Anthony Brigidi' }, duration: Duration.fromObject({ minutes: 2 }) },
        { name: 'Gemma Smith', helping: { name: 'Colin Arscott' }, duration: Duration.fromObject({ minutes: 9 }) }
    ]

    const activeMeeting = { name: 'Parker Griep', taName: 'Benedict Wong', taContactLink: 'https://google.com' }

    const queue = false ? [] : [
        { name: 'Tyler Beep', question: 'HW4 Question 2a' },
        { name: 'Yang', question: 'Clarification' },
        { name: 'Beeg Chungus', question: 'Among Us tips' }
    ]

    const me = "Parker Griep"

    return (
        <main className={styles.content}>
            <Container fluid className={styles.container}>
                <Row className={styles.headerrow}>
                    <Col lg={{span: 4}}>
                        <EstimatedTime
                            estimatedDuration={Duration.fromObject({ minutes: 33 })}
                            lastUpdated={lastUpdated}
                            updateThreshold={updateThreshold}
                        />
                    </Col>
                    <Col lg={{span: 8}}>
                        <TitleCard 
                            title="CS 3700 Networks Office Hours"
                            taCount={3}
                            startTime={startTime}
                            endTime={endTime}
                        />
                        <QueueControl />
                    </Col>
                </Row>
                <Row className={styles.listview}>
                    <Col lg={{span: 4}}>
                        <TAView tas={tas} />
                    </Col>
                    <Col lg={{span: 8}}>
                        { activeMeeting && <MeetingView 
                            name={activeMeeting.name} 
                            taName={activeMeeting.taName}
                            taContactLink={activeMeeting.taContactLink}
                        /> }
                        <StudentView queue={queue} me={me} />
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default QueueView