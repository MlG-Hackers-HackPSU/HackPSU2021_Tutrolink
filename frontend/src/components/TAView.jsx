import TACard from './TACard.jsx'
import styles from './TAView.module.css'

function TAView({ tas }) {
    return (
        <section>
            <h2 className={styles.taheader}>Answerers</h2>
            <section className={styles.content}>
                { tas?.length ? (
                    tas?.map((ta, idx) => (
                        <section className={styles.card} key={ta.name}>
                            <TACard name={ta.name} helping={ta.helping} duration={ta.duration} idx={idx} />
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