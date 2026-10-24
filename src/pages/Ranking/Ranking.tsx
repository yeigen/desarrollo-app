import { IonBadge, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import { rankingFor } from '../../helpers/ranking'
import { useAuth } from '../../hooks/useAuth'
import { useRanking } from '../../hooks/useRanking'
import styles from './Ranking.module.css'

const MEDALS = [styles.gold, styles.silver, styles.bronze]

function Ranking() {
  const { user } = useAuth()
  const entries = useRanking()
  const ranking = entries ? rankingFor(entries, user!.uid) : null
  const me = ranking?.find(entry => entry.isMe)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ranking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.content}>
          {!ranking && <IonSpinner className={styles.spinner} aria-label="Cargando ranking" />}
          {ranking && (
            <>
              <p className={styles.caption}>
                Top 5 en tiempo real.
                {me && ` Estás en el puesto ${me.position} de ${entries!.length} jugadores.`}
              </p>
              <ol className={styles.list}>
                {ranking.map((entry, index) => (
                  <li key={entry.uid} className={entry.isMe ? `${styles.row} ${styles.me}` : styles.row}>
                    {index > 0 && entry.position - ranking[index - 1].position > 1 && (
                      <span className={styles.gap} aria-hidden="true">⋯</span>
                    )}
                    <span className={`${styles.position} ${MEDALS[entry.position - 1] ?? ''}`}>{entry.position}</span>
                    <span className={styles.name}>
                      {entry.name}
                      {entry.isMe && <IonBadge>Tú</IonBadge>}
                    </span>
                    <span className={styles.points}>{entry.points} pts</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Ranking
