import styles from './TitleCard.module.css'

function TitleCard({title}) {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
        </section>
    )
}

export default TitleCard