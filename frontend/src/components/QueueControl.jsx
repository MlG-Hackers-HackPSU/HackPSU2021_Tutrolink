import { Button } from 'react-bootstrap'
import styles from './QueueControl.module.css'

function QueueControl({ inQueue, openQuestionModal }) {

    const leaveQueue = () => {
        console.log('leaveQueue')
    }

    return (
        <section className={styles.content}>
            <Button variant='success' onClick={openQuestionModal} disabled={inQueue}>
                Join Queue
            </Button>
            <Button variant='danger' onClick={leaveQueue} disabled={!inQueue} >
                Leave Queue
            </Button>
        </section>
    )
}

export default QueueControl