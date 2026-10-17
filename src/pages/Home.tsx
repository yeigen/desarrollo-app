import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import {
  cameraOutline,
  cloudDownloadOutline,
  folderOutline,
  locationOutline,
  notificationsOutline,
  phonePortraitOutline,
  pulseOutline,
  speedometerOutline,
} from 'ionicons/icons'

const SENSORS = [
  { path: '/camera', label: 'Cámara', icon: cameraOutline },
  { path: '/device', label: 'Dispositivo', icon: phonePortraitOutline },
  { path: '/filesystem', label: 'Archivos', icon: folderOutline },
  { path: '/geolocation', label: 'Ubicación', icon: locationOutline },
  { path: '/haptics', label: 'Vibración', icon: pulseOutline },
  { path: '/local-notifications', label: 'Notificaciones locales', icon: notificationsOutline },
  { path: '/motion', label: 'Movimiento', icon: speedometerOutline },
  { path: '/push-notifications', label: 'Notificaciones push', icon: cloudDownloadOutline },
]

function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Elige un sensor para probarlo en el celular.</p>
        {SENSORS.map(sensor => (
          <IonButton key={sensor.path} expand="block" routerLink={sensor.path}>
            <IonIcon slot="start" icon={sensor.icon} />
            {sensor.label}
          </IonButton>
        ))}
      </IonContent>
    </IonPage>
  )
}

export default Home
