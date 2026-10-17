import { IonButton } from '@ionic/react'
import { ImpactStyle, NotificationType } from '@capacitor/haptics'
import SensorPage from '../components/SensorPage'
import { useHaptics } from '../hooks/useHaptics'

const IMPACTS = [
  { style: ImpactStyle.Light, label: 'Ligero' },
  { style: ImpactStyle.Medium, label: 'Medio' },
  { style: ImpactStyle.Heavy, label: 'Fuerte' },
]

const NOTIFICATIONS = [
  { type: NotificationType.Success, label: 'Éxito', color: 'success' },
  { type: NotificationType.Warning, label: 'Advertencia', color: 'warning' },
  { type: NotificationType.Error, label: 'Error', color: 'danger' },
]

function HapticsPage() {
  const { error, impact, notification, vibrate } = useHaptics()

  return (
    <SensorPage title="Vibración" error={error}>
      <h2>Impacto</h2>
      {IMPACTS.map(item => (
        <IonButton key={item.style} expand="block" fill="outline" onClick={() => impact(item.style)}>
          {item.label}
        </IonButton>
      ))}
      <h2>Notificación</h2>
      {NOTIFICATIONS.map(item => (
        <IonButton key={item.type} expand="block" color={item.color} onClick={() => notification(item.type)}>
          {item.label}
        </IonButton>
      ))}
      <h2>Vibración larga</h2>
      <IonButton expand="block" onClick={vibrate}>
        Vibrar 1 segundo
      </IonButton>
    </SensorPage>
  )
}

export default HapticsPage
