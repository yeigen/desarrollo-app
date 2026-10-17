import { IonButton, IonItem, IonLabel, IonList, IonTextarea } from '@ionic/react'
import SensorPage from '../components/SensorPage'
import { usePushNotifications } from '../hooks/usePushNotifications'

function PushNotificationsPage() {
  const { isSupported, token, lastNotification, error, register } = usePushNotifications()

  if (!isSupported) {
    return (
      <SensorPage title="Notificaciones push">
        <p>Las notificaciones push solo funcionan en la app instalada en el celular.</p>
      </SensorPage>
    )
  }

  return (
    <SensorPage title="Notificaciones push" error={error}>
      <IonButton expand="block" onClick={register}>
        Activar notificaciones push
      </IonButton>
      {token && (
        <>
          <p>Copia este token y úsalo en Firebase, en Messaging, para enviar un mensaje de prueba:</p>
          <IonTextarea readonly autoGrow value={token} aria-label="Token del dispositivo" />
        </>
      )}
      <h2>Última notificación</h2>
      {lastNotification ? (
        <IonList>
          <IonItem>
            <IonLabel>
              <h3>{lastNotification.title}</h3>
              <p>{lastNotification.body}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      ) : (
        <p>Todavía no llega ninguna con la app abierta.</p>
      )}
    </SensorPage>
  )
}

export default PushNotificationsPage
