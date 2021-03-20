// Home page of the desktop browser
import styles from './Home.module.css'
import { Container, Col, Row } from 'react-bootstrap'
import QueueView from '../components/QueueView.jsx'

function Home() {
    return (
        <Container fluid>
            <Row>
                <main className={styles.wrapper}>
                    <Col lg={{ span: 6 }}>
                        <QueueView />
                    </Col>
                </main>
            </Row>
        </Container>
    )
}

export default Home