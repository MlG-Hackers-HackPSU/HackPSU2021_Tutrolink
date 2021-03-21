import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { animationInterval } from '../lib/animationInterval.js';
import styles from './EstimatedTime.module.css'

function EstimatedTime({ estimatedDuration, lastUpdated, updateThreshold, update }) {

    const [sinceLastUpdated, setSinceLastUpdated] = useState(lastUpdated.diffNow('second'))
    const [canUpdate, setCanUpdate] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        animationInterval(1000, controller.signal, _ => {
            const diff = lastUpdated.diffNow("second")
            setSinceLastUpdated(diff)
            setCanUpdate(-diff.get('seconds') > updateThreshold.get('second'))
        })
        return () => controller.abort()
    }, [sinceLastUpdated, lastUpdated, setCanUpdate, updateThreshold])

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