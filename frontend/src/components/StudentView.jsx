import client from '../client/client.js'
import StudentCard from './StudentCard.jsx'
import styles from './StudentView.module.css'

function StudentView({ queue, me, showMeet, session, setQueue, cookies }) {
    if (!queue?.length) {
        return (
            <section className={styles.nostudents}>
                There are currently no students in the queue!
            </section>
        )
    }

    const meet = (studentId, tutorId) => {
        client.meet(session, studentId, tutorId).then(queue => {
            setQueue(queue)
        })
    }

    return queue.map((student, idx) => (
            <StudentCard 
                key={student.student_id}
                id={student.student_id}
                name={student.name}
                question={student.question}
                pos={idx+1}
                me={me}
                showMeet={showMeet}
                meet={meet}
                cookies={cookies}
            />))
}

export default StudentView