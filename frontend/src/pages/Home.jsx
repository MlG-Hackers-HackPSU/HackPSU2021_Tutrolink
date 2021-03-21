// Home page of the desktop browser
import { useLocation } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import QueueView from '../components/QueueView.jsx'
import QueueCreate from '../components/QueueCreate.jsx'
import styles from './Home.module.css'

const STUDENT_LINK = /^\/(.+)\/(.+)\/student\/join\/?/
const TUTOR_LINK = /^\/(.+)\/(.+)\/tutor\/join\/?/

function Home() {
    const location = useLocation()

    let Queue = () => <QueueCreate />
    if (STUDENT_LINK.exec(location.pathname)) {
        const match = STUDENT_LINK.exec(location.pathname)
        Queue = () => <QueueView student={true} session={match[1]} id={match[2]} />
    } else if (TUTOR_LINK.exec(location.pathname)) {
        const match = TUTOR_LINK.exec(location.pathname)
        Queue = () => <QueueView student={false} session={match[1]} id={match[2]} />
    }
    
    return (
        <Container fluid>
            <Row>
                <main className={styles.wrapper}>
                    <Col lg={{ span: 7 }}>
                        <Queue />
                    </Col>
                </main>
            </Row>
        </Container>
    )
}

export default Home