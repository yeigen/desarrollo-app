import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { cameraOutline, mapOutline, timeOutline } from 'ionicons/icons'

const SECTIONS = [
  { path: '/map', label: 'Mapa y rastreo', icon: mapOutline },
  { path: '/history', label: 'Historial', icon: timeOutline },
  { path: '/photo', label: 'Foto con ubicación', icon: cameraOutline },
]

function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Rastreo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Registra tus recorridos con el GPS, revisa los de cada día y toma fotos con tu ubicación.</p>
        {SECTIONS.map(section => (
          <IonButton key={section.path} expand="block" routerLink={section.path}>
            <IonIcon slot="start" icon={section.icon} />
            {section.label}
          </IonButton>
        ))}
      </IonContent>
    </IonPage>
  )
}

export default Home
