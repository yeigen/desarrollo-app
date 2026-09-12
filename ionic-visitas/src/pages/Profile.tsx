import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { logOutOutline } from 'ionicons/icons'
import type { Session } from '../services/auth'

interface ProfileProps {
  session: Session
  onLogout: () => void
}

function Profile({ session, onLogout }: ProfileProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>
              <h2>{session.name}</h2>
              <p>{session.specialty}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <h2>Usuario</h2>
              <p>{session.username}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonButton className="ion-margin-top" expand="block" color="danger" onClick={onLogout}>
          <IonIcon slot="start" icon={logOutOutline} />
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Profile
