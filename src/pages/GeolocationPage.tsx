import { IonButton, IonList } from '@ionic/react'
import SensorPage from '../components/SensorPage'
import ValueItem from '../components/ValueItem'
import { useGeolocation } from '../hooks/useGeolocation'

const COORDINATE_DECIMALS = 6

function GeolocationPage() {
  const { position, isTracking, error, getCurrentPosition, startTracking, stopTracking } = useGeolocation()
  const coords = position?.coords

  return (
    <SensorPage title="Ubicación" error={error}>
      <IonButton expand="block" onClick={getCurrentPosition}>
        Ubicación actual
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={isTracking ? stopTracking : startTracking}>
        {isTracking ? 'Detener seguimiento' : 'Seguir ubicación'}
      </IonButton>
      <IonList>
        <ValueItem label="Latitud" value={coords ? coords.latitude.toFixed(COORDINATE_DECIMALS) : '-'} />
        <ValueItem label="Longitud" value={coords ? coords.longitude.toFixed(COORDINATE_DECIMALS) : '-'} />
        <ValueItem label="Precisión" value={coords ? `${Math.round(coords.accuracy)} m` : '-'} />
        <ValueItem
          label="Actualizada"
          value={position ? new Date(position.timestamp).toLocaleTimeString() : '-'}
        />
      </IonList>
      {isTracking && <p>Siguiendo la ubicación: los valores cambian cuando te mueves.</p>}
    </SensorPage>
  )
}

export default GeolocationPage
