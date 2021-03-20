import { Button } from 'react-bootstrap'
import styles from './EstimatedTime.module.css'

function EstimatedTime({ estimatedDuration, lastUpdated, updateThreshold }) {

    const sinceLastUpdated = lastUpdated.diffNow("second")
    const canUpdate = -sinceLastUpdated.get('seconds') > updateThreshold.get('second')

    const update = () => {
        console.log('update')
    }

    return (
        <main className={styles.content}>
            <h2 className={styles.eta}>
                <span className={styles.time}>
                    { estimatedDuration.get('minutes') }
                </span>
                <span className={styles.minutes}> min ETA</span>
            </h2>
            <section className={styles.lastupdated}>
                Last updated: { Math.round(-sinceLastUpdated.get('seconds')) } sec ago
            </section>
            <section className={styles.update}>
                <Button onClick={update} disabled={!canUpdate}>
                    Refresh Queue
                </Button>
            </section>
        </main>
    )
}

export default EstimatedTime