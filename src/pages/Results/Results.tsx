import { IonBadge, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { checkmarkCircle, ellipseOutline, trophy } from 'ionicons/icons'
import { isCompleted, MISSIONS, summarize } from '../../helpers/missions'
import { useProgress } from '../../hooks/useProgress'
import styles from './Results.module.css'

const STATUS_COLORS: Record<string, string> = {
  'Sin empezar': 'medium',
  'En progreso': 'warning',
  Completado: 'success',
}

function Results() {
  const { progress } = useProgress()
  const { completed, total, remaining, percent, status } = summarize(progress)
  const message = remaining === 0
    ? 'Completaste todas las misiones.'
    : `Te ${remaining === 1 ? 'falta 1 misión' : `faltan ${remaining} misiones`} para completar.`

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.content}>
          <section className={styles.hero}>
            <IonIcon icon={trophy} className={styles.trophy} aria-hidden="true" />
            <span className={styles.points}>{progress.points}</span>
            <span className={styles.caption}>puntos totales</span>
          </section>

          <section className={styles.card}>
            <div className={styles.heading}>
              <h2>Estado general</h2>
              <IonBadge color={STATUS_COLORS[status]}>{status}</IonBadge>
            </div>
            <p className={styles.message}>{message} Llevas el {percent}%.</p>
          </section>

          <section className={styles.card}>
            <div className={styles.heading}>
              <h2>Misiones completadas</h2>
              <span className={styles.count}>{completed} de {total}</span>
            </div>
            <ul className={styles.list}>
              {MISSIONS.map(mission => {
                const done = isCompleted(progress, mission.id)
                return (
                  <li key={mission.id} className={styles.item}>
                    <IonIcon
                      icon={done ? checkmarkCircle : ellipseOutline}
                      color={done ? 'success' : 'medium'}
                      aria-label={done ? 'Completada' : 'Pendiente'}
                    />
                    <span className={styles.name}>{mission.title}</span>
                    <span className={done ? styles.earned : styles.pending}>
                      {done ? `+${mission.points}` : 'Pendiente'}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Results
