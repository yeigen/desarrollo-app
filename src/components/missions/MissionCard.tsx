import type { ReactNode } from 'react'
import { IonBadge, IonIcon } from '@ionic/react'
import { checkmark } from 'ionicons/icons'
import styles from './MissionCard.module.css'

interface MissionCardProps {
  mission: { title: string; description: string; points: number }
  icon: string
  completed: boolean
  error?: string
  children: ReactNode
}

function MissionCard({ mission, icon, completed, error, children }: MissionCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={completed ? `${styles.icon} ${styles.done}` : styles.icon}>
          <IonIcon icon={completed ? checkmark : icon} aria-hidden="true" />
        </div>
        <div className={styles.titles}>
          <h2 className={styles.title}>{mission.title}</h2>
          <p className={styles.description}>{mission.description}</p>
        </div>
      </div>
      <div className={styles.meta}>
        <IonBadge color={completed ? 'success' : 'medium'}>{completed ? 'Completada' : 'Pendiente'}</IonBadge>
        <span className={styles.points}>+{mission.points} pts</span>
      </div>
      <div className={styles.body}>{children}</div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </section>
  )
}

export default MissionCard
