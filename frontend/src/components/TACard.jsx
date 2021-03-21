import { DateTime } from 'luxon'
import styles from './TACard.module.css'

function TACard({ tutor, meeting }) {
    return (
        <section className={styles.content}>
            <span className={styles.name}>{tutor.Name}</span>
            { meeting ? (
                <span className={styles.help}>
                    &nbsp;is helping {meeting.Student.name} for {-Math.round(DateTime.fromISO(meeting.StartTime, {zone: 'utc'}).diffNow('minutes').get('minutes'))} minutes.
                </span>
            ) : (
                <span className={styles.ready}>
                    {" "}is ready to take a student!
                </span>
            )}
        </section>
    )
}

export default TACard