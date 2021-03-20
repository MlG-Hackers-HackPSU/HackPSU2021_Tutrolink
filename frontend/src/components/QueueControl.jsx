import { Button } from 'react-bootstrap'
import styles from './QueueControl.module.css'

function QueueControl() {

    const joinQueue = () => {
        console.log('joinQueue')
    }

    const leaveQueue = () => {
        console.log('leaveQueue')
    }

    return (
        <section className={styles.content}>
            <Button variant='success' onClick={joinQueue}>
                Join Queue
            </Button>
            <Button variant='danger' onClick={leaveQueue}>
                Leave Queue
            </Button>
        </section>
    )
}

export default QueueControl