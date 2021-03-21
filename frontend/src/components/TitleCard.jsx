import { DateTime } from 'luxon'
import styles from './TitleCard.module.css'

function TitleCard({ title, taCount, startTime, endTime}) {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
            <section className={styles.subheader}>
                <span className={styles.tacount}>
                    Answerers Online: {taCount}
                </span>
                <span className={styles.times}>
                    <span className={styles.time}>
                        { startTime.toLocaleString(DateTime.TIME_SIMPLE) }
                    </span>
                    &mdash;
                    <span className={styles.time}>
                        { endTime.toLocaleString(DateTime.TIME_SIMPLE) }
                    </span>
                </span>
            </section>
        </section>
    )
}

export default TitleCard