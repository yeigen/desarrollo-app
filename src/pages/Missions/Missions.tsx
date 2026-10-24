import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { logOutOutline } from 'ionicons/icons'
import PhotoMission from '../../components/missions/PhotoMission'
import StillMission from '../../components/missions/StillMission'
import WalkMission from '../../components/missions/WalkMission'
import ProgressSummary from '../../components/shared/ProgressSummary'
import { useAuth } from '../../hooks/useAuth'
import { useProgress } from '../../hooks/useProgress'
import styles from './Missions.module.css'

function Missions() {
  const { logout } = useAuth()
  const { name } = useProgress()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout} aria-label="Cerrar sesión">
              <IonIcon slot="icon-only" icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.content}>
          <p className={styles.greeting}>Hola, <strong>{name}</strong></p>
          <ProgressSummary />
          <PhotoMission />
          <WalkMission />
          <StillMission />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Missions
