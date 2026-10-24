import { IonProgressBar } from '@ionic/react'
import { summarize } from '../../helpers/missions'
import { useProgress } from '../../hooks/useProgress'
import styles from './ProgressSummary.module.css'

function ProgressSummary() {
  const { progress } = useProgress()
  const { completed, total, percent } = summarize(progress)

  return (
    <section className={styles.summary}>
      <div className={styles.total}>
        <span className={styles.points}>{progress.points}</span>
        <span>puntos acumulados</span>
      </div>
      <IonProgressBar value={percent / 100} className={styles.bar} />
      <div className={styles.row}>
        <span>{completed}/{total} misiones completadas</span>
        <span className={styles.percent}>{percent}%</span>
      </div>
    </section>
  )
}

export default ProgressSummary
