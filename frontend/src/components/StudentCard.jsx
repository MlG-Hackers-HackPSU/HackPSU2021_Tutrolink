// Student Card
import { Button } from 'react-bootstrap'
import styles from './StudentCard.module.css'

function StudentCard({ id, name, pos, me, question, showMeet, meet }) {
    const ticker = id === me?.student_id ? "⭐" : `${pos}`
    return (
        <section className={`${styles.contain} ${pos % 2 ? styles.container : styles.wcontainer}`}>
            <span className={styles.name}>
                { `${ticker}) ${name}`}
            </span>
            <span className={styles.question}>
                {question}
            </span>
            { showMeet && <Button variant="primary" onClick={() => meet(id, me?.ID)}>Meet</Button> }
        </section>
    )
}

export default StudentCard