import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

function Patients() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen />
    </IonPage>
  )
}

export default Patients
