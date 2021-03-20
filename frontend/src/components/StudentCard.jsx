// Student Card
import styles from './StudentCard.module.css'

function StudentCard({ name, pos, me, question }) {
    const ticker = name === me ? "⭐" : `${pos}`
    return (
        <section className={`${styles.contain} ${pos % 2 ? styles.container : styles.wcontainer}`}>
            <span className={styles.name}>
                { `${ticker}) ${name}`}
            </span>
            <span className={styles.question}>
                {question}
            </span>
        </section>
    )
}

export default StudentCard