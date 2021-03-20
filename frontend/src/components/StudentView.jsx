import StudentCard from './StudentCard.jsx'
import styles from './StudentView.module.css'

function StudentView({ queue, me }) {
    if (!queue?.length) {
        return (
            <section className={styles.nostudents}>
                There are currently no students in the queue!
            </section>
        )
    }

    return queue.map((student, idx) => (
            <StudentCard key={student.name} name={student.name} question={student.question} pos={idx+1} me={me} />))
}

export default StudentView