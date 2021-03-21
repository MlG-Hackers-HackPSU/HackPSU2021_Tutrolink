import styles from './TACard.module.css'

function TACard({ name, helping, duration, idx,status }) {
    if (status) {
        return (
            <section className={styles.content}>
                <span className={styles.name}>{name}</span>
                { helping ? (
                    <span className={styles.help}>
                        &nbsp;is helping {helping.name} for {duration.get('minutes')} minutes.
                    </span>
                ) : (
                    <span className={styles.ready}>
                        {" "}is ready to accept a student!
                    </span>
                )}
            </section>
        )
    }
    return (
        <section className={styles.content}>
            <span className={styles.name}>{name}</span>
            { helping ? (
                <span className={styles.help}>
                    &nbsp;is helping {helping.name} for {duration.get('minutes')} minutes.
                </span>
            ) : (
                <span className={styles.ready}>
                    {" "}is not ready to take a student
                </span>
            )}
        </section>
    )
}

export default TACard