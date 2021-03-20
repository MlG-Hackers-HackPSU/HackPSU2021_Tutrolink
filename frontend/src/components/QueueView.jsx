import { Container, Row, Col } from 'react-bootstrap'
import { DateTime } from 'luxon'
import styles from './QueueView.module.css'
import TitleCard from './TitleCard.jsx'

function QueueView() {

    const startTime = DateTime.now()
    const endTime = DateTime.now().plus({ hours: 1 })

    console.log({startTime, endTime})

    return (
        <main className={styles.content}>
            <Container fluid className={styles.container}>
                <Row>
                    <Col lg={{span: 4}}>
                        Foobar
                    </Col>
                    <Col lg={{span: 8}}>
                        <TitleCard 
                            title="CS 3700 Networks Office Hours"
                            taCount={3}
                            startTime={startTime}
                            endTime={endTime}
                        />
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default QueueView