import { IonItem, IonLabel } from '@ionic/react'
import StoreLogo from '../shared/StoreLogo'
import { formatDistance } from '../../helpers/format'
import { directionsUrl, type NearbyLocation } from '../../helpers/locations'
import styles from './LocationItem.module.scss'

interface LocationItemProps {
  location: NearbyLocation
}

function LocationItem({ location }: LocationItemProps) {
  return (
    <IonItem href={directionsUrl(location)} target="_blank" rel="noreferrer" detail lines="none" className={styles.item}>
      <span slot="start" className={styles.logo}>
        <StoreLogo store={location.store_id} size={24} />
      </span>
      <IonLabel className={styles.info}>
        <h3>{location.name}</h3>
        <p>{location.address ?? 'Sin dirección registrada'}</p>
      </IonLabel>
      <span slot="end" className={styles.distance}>{formatDistance(location.distance)}</span>
    </IonItem>
  )
}

export default LocationItem
