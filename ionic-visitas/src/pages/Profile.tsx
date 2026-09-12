import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

function Profile() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen />
    </IonPage>
  )
}

export default Profile
