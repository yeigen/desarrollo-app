import { IonButton, IonList } from '@ionic/react'
import SensorPage from '../components/SensorPage'
import ValueItem from '../components/ValueItem'
import { useLocalNotifications } from '../hooks/useLocalNotifications'

const REMINDER_DELAY_MS = 5000

const PERMISSION_LABELS = {
  granted: 'Concedido',
  denied: 'Denegado',
  prompt: 'Sin pedir',
  'prompt-with-rationale': 'Sin pedir',
}

function LocalNotificationsPage() {
  const { permission, error, requestPermission, notifyNow, notifyIn } = useLocalNotifications()
  const isGranted = permission === 'granted'

  return (
    <SensorPage title="Notificaciones locales" error={error}>
      <IonList>
        <ValueItem label="Permiso" value={permission ? PERMISSION_LABELS[permission] : '-'} />
      </IonList>
      {!isGranted && (
        <IonButton expand="block" onClick={requestPermission}>
          Pedir permiso
        </IonButton>
      )}
      <IonButton expand="block" disabled={!isGranted} onClick={() => notifyNow('Hola', 'Notificación inmediata')}>
        Notificar ahora
      </IonButton>
      <IonButton
        expand="block"
        fill="outline"
        disabled={!isGranted}
        onClick={() => notifyIn('Recordatorio', 'Programado hace 5 segundos', REMINDER_DELAY_MS)}
      >
        Recordar en 5 segundos
      </IonButton>
    </SensorPage>
  )
}

export default LocalNotificationsPage
