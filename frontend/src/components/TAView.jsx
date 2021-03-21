import TACard from './TACard.jsx'
import styles from './TAView.module.css'

function TAView({ tas, meetings }) {
    const getActiveMeeting = (ta) => {
        const ta_meetings = meetings.filter(meeting => 
            meeting.Active && meeting.Tutor.ID === ta.ID)
        return ta_meetings ? ta_meetings[ta_meetings.length - 1] : null
    }

    return (
        <section>
            <h2 className={styles.taheader}>Answerers</h2>
            <section className={styles.content}>
                { tas?.length ? (
                    tas?.map((ta) => (
                        <section className={styles.card} key={ta.ID}>
                            <TACard tutor={ta} meeting={getActiveMeeting(ta)} />
                        </section>
                    ))
                ) : (
                    <section className={styles.notabox}>
                        <p className={styles.nota}>
                            Looks like no TAs are currently online!
                        </p>
                    </section>
                )}
            </section>
        </section>
    )
}

export default TAView