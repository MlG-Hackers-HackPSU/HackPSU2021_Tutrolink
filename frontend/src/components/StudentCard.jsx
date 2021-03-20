// Student Card
import styles from './StudentCard.module.css'

function StudentCard({ name, pos, me }) {
    let container = null
    if (pos % 2 == 0){
        container = styles.container
    }else {
        container = styles.wcontainer
    }
    if (name == me){
        pos = "⭐"
    }
    return (
        <section className={container}>
            <span>
                {"(" + pos + ") " + name}
            </span>
        </section>
    )
}

export default StudentCard