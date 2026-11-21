import { useEffect, useRef, useState } from 'react'
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
} from '@ionic/react'
import { playOutline, searchOutline, stopOutline } from 'ionicons/icons'
import SensorPage from '../components/SensorPage'
import TrackMap from '../components/TrackMap'
import ValueItem from '../components/ValueItem'
import { useOpenCage } from '../hooks/useOpenCage'
import { useTracking } from '../hooks/useTracking'
import { formatDistance } from '../utils/format'
import { pathLengthInMeters, type Coordinates } from '../utils/geo'
import { shouldRefreshAddress } from '../utils/places'

const CATEGORIES = [
  { label: 'Restaurantes', query: 'restaurante' },
  { label: 'Droguerías', query: 'drogueria' },
  { label: 'Bancos', query: 'banco' },
  { label: 'Hoteles', query: 'hotel' },
]

const MOVEMENT_LABELS = { still: 'Quieto', moving: 'En movimiento', fast: 'Rápido' }

const CONNECTION_LABELS = { wifi: 'Wifi', cellular: 'Datos móviles', none: 'Sin conexión', unknown: 'Desconocida' }

const PERCENT = 100

function MapPage() {
  const tracking = useTracking()
  const openCage = useOpenCage()
  const [category, setCategory] = useState(CATEGORIES[0].query)
  const lastLookupRef = useRef<Coordinates | null>(null)
  const { connected, connectionType, isWifi } = tracking.network
  const { isConfigured, lookupAddress } = openCage
  const latitude = tracking.position?.coords.latitude
  const longitude = tracking.position?.coords.longitude
  const user = latitude !== undefined && longitude !== undefined ? { lat: latitude, lng: longitude } : undefined

  useEffect(() => {
    if (latitude === undefined || longitude === undefined || !isConfigured || !connected || !isWifi) return
    const current = { lat: latitude, lng: longitude }
    if (!shouldRefreshAddress(lastLookupRef.current, current)) return
    lastLookupRef.current = current
    lookupAddress(current)
  }, [latitude, longitude, isConfigured, connected, isWifi, lookupAddress])

  const trackingState = !tracking.isTracking ? 'Detenido' : tracking.isPaused ? 'En pausa: el celular está quieto' : 'Rastreando'
  const batteryLevel = tracking.battery?.batteryLevel

  return (
    <SensorPage title="Mapa" error={tracking.error}>
      {user ? (
        <TrackMap center={user} user={user} paths={[tracking.path]} places={openCage.places} />
      ) : (
        <p>
          <IonSpinner name="dots" /> Buscando tu ubicación...
        </p>
      )}
      {!connected && (
        <IonText color="warning">
          <p>Sin conexión: el mapa no carga teselas nuevas, pero el recorrido se sigue guardando.</p>
        </IonText>
      )}

      <IonButton
        expand="block"
        color={tracking.isTracking ? 'danger' : 'primary'}
        onClick={tracking.isTracking ? tracking.stop : tracking.start}
      >
        <IonIcon slot="start" icon={tracking.isTracking ? stopOutline : playOutline} />
        {tracking.isTracking ? 'Detener rastreo' : 'Iniciar rastreo'}
      </IonButton>

      <IonList>
        <ValueItem label="Estado" value={trackingState} />
        <ValueItem
          label="Movimiento"
          value={tracking.isTracking ? `${MOVEMENT_LABELS[tracking.movement]} (${tracking.speedKmh.toFixed(1)} km/h)` : '-'}
        />
        <ValueItem label="Recorrido" value={`${formatDistance(pathLengthInMeters(tracking.path))} · ${tracking.path.length} puntos`} />
        <ValueItem label="Batería" value={batteryLevel === undefined ? '-' : `${Math.round(batteryLevel * PERCENT)} %`} />
        <ValueItem label="Conexión" value={CONNECTION_LABELS[connectionType]} />
      </IonList>

      <IonListHeader>
        <IonLabel>Dirección actual</IonLabel>
      </IonListHeader>
      {!isConfigured ? (
        <IonText color="warning">
          <p>Falta la key de OpenCage: copia .env.example a .env.local y llena VITE_OPENCAGE_API_KEY.</p>
        </IonText>
      ) : (
        <>
          <p>{openCage.address || (isWifi ? 'Consultando la dirección...' : 'Con wifi la dirección se consulta sola.')}</p>
          {openCage.error && (
            <IonText color="danger">
              <p role="alert">{openCage.error}</p>
            </IonText>
          )}
          {!isWifi && (
            <IonButton size="small" fill="outline" disabled={!user || !connected} onClick={() => user && lookupAddress(user)}>
              Consultar con datos móviles
            </IonButton>
          )}

          <IonListHeader>
            <IonLabel>Lugares cercanos</IonLabel>
          </IonListHeader>
          <IonSegment scrollable value={category} onIonChange={event => setCategory(String(event.detail.value))}>
            {CATEGORIES.map(({ label, query }) => (
              <IonSegmentButton key={query} value={query}>
                <IonLabel>{label}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
          <IonButton
            expand="block"
            fill="outline"
            disabled={!user || !connected}
            onClick={() => user && openCage.searchPlaces(category, user)}
          >
            <IonIcon slot="start" icon={searchOutline} />
            Buscar cerca de mí
          </IonButton>
          <IonList>
            {openCage.places.map(place => (
              <IonItem key={`${place.lat},${place.lng}`}>
                <IonLabel>
                  <h3>{place.name}</h3>
                  <p>{place.address}</p>
                </IonLabel>
                <IonNote slot="end">{formatDistance(place.distance)}</IonNote>
              </IonItem>
            ))}
          </IonList>
        </>
      )}

      {tracking.alerts.length > 0 && (
        <IonList>
          <IonListHeader>
            <IonLabel>Avisos</IonLabel>
          </IonListHeader>
          {tracking.alerts.map(alert => (
            <IonItem key={`${alert.time}-${alert.title}`}>
              <IonLabel>
                <h3>{alert.title}</h3>
                <p>{alert.body}</p>
              </IonLabel>
              <IonNote slot="end">{new Date(alert.time).toLocaleTimeString()}</IonNote>
            </IonItem>
          ))}
        </IonList>
      )}
    </SensorPage>
  )
}

export default MapPage
