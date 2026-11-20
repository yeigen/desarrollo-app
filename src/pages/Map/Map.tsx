import { IonContent, IonPage } from '@ionic/react'
import { LocateFixed, Store } from 'lucide-react'
import LocationItem from '../../components/map/LocationItem'
import StoreMap from '../../components/map/StoreMap'
import EmptyState from '../../components/shared/EmptyState'
import Header from '../../components/shared/Header'
import SectionLabel from '../../components/shared/SectionLabel'
import Warning from '../../components/shared/Warning'
import { CALI_CENTER, nearbyLocations } from '../../helpers/locations'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import { useNetwork } from '../../hooks/useNetwork'
import { useStores } from '../../hooks/useStores'
import { useSupabaseLocations } from '../../hooks/useSupabaseLocations'
import styles from './Map.module.scss'

function Map() {
  const { isEnabled } = useStores()
  const locations = useSupabaseLocations()
  const position = useCurrentPosition()
  const connected = useNetwork()
  const origin = position ?? CALI_CENTER
  const nearby = locations ? nearbyLocations(locations, origin, isEnabled) : []

  return (
    <IonPage>
      <Header title="Tiendas cercanas" />
      <IonContent>
        {position === undefined || !locations ? (
          <EmptyState
            icon={<LocateFixed size={32} />}
            title="Buscando tu ubicación"
            text="Permite el acceso a la ubicación para ver las tiendas más cerca de ti."
          />
        ) : (
          <div className={styles.content}>
            {!connected && <Warning>Sin conexión: el mapa y las sedes pueden no estar al día.</Warning>}
            {position === null && <Warning>No pudimos obtener tu ubicación. Las distancias se miden desde el centro de Cali.</Warning>}
            <StoreMap origin={origin} located={position !== null} locations={nearby} />
            {nearby.length === 0 ? (
              <EmptyState icon={<Store size={32} />} title="Sin tiendas activas" text="Ninguna de las tiendas está disponible en este momento." />
            ) : (
              <section className={styles.card}>
                <SectionLabel>Más cerca de ti</SectionLabel>
                {nearby.map((location) => (
                  <LocationItem key={location.id} location={location} />
                ))}
              </section>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Map
