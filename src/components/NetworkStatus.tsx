import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import { cellularOutline, cloudOfflineOutline, wifiOutline } from 'ionicons/icons'
import { useNetwork } from '../hooks/useNetwork'

const CONNECTION_LABELS = {
  wifi: 'wifi',
  cellular: 'datos móviles',
  none: 'sin red',
  unknown: 'tipo desconocido',
}

function NetworkStatus() {
  const { isOnline, connectionType } = useNetwork()

  if (!isOnline) {
    return (
      <IonItem lines="none" color="danger">
        <IonIcon slot="start" icon={cloudOfflineOutline} />
        <IonLabel>Sin conexión</IonLabel>
      </IonItem>
    )
  }

  return (
    <IonItem lines="none">
      <IonIcon slot="start" color="success" icon={connectionType === 'cellular' ? cellularOutline : wifiOutline} />
      <IonLabel>Conectado ({CONNECTION_LABELS[connectionType]})</IonLabel>
    </IonItem>
  )
}

export default NetworkStatus
