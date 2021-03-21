import { Button } from 'react-bootstrap'
import client from '../client/client'
import styles from './QueueControl.module.css'

function QueueControl({ inQueue, openQuestionModal, 
    me, session, setQueue, setMe, setInQueue, student,
    openAnswerModal,openModifyModal }) {

    const leaveQueue = () => {
        client.leaveRoom(session, me?.student_id).then(queue => {
            setQueue(queue)
            setMe(null)
            setInQueue(false)
        })
    }

    const deactivate = () => {
        client.deactivateTa(session, me?.ID).then(queue => {
            setQueue(queue)
            setInQueue(false)
        })
    }

    if(student){
        return (
            <section className={styles.content}>
                <Button variant='success' onClick={openQuestionModal} disabled={inQueue}>
                    Join Queue
                </Button>
                <Button variant='danger' onClick={leaveQueue} disabled={!(inQueue && me)} >
                    Leave Queue
                </Button>
            </section>
        )
    }

    if (me) {
        return (
            <section className={styles.content}>
                <Button variant='success' onClick={openModifyModal} disabled={inQueue}>
                    Rejoin
                </Button>
                <Button variant='danger' onClick={deactivate} disabled={!(inQueue && me)} >
                    Done for now
                </Button>
            </section>
        )
    }

    return (
        <section className={styles.content}>
            <Button variant='success' onClick={openAnswerModal} disabled={inQueue}>
                Ready Up
            </Button>
            <Button variant='danger' onClick={deactivate} disabled={!(inQueue && me)} >
                Done for now
            </Button>
        </section>
    )
}

export default QueueControl