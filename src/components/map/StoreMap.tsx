import { useEffect } from 'react'
import { divIcon } from 'leaflet'
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_TILES_URL } from '../../config'
import { formatDistance } from '../../helpers/format'
import { directionsUrl, type Coordinates, type NearbyLocation } from '../../helpers/locations'
import { STORES } from '../../helpers/stores'
import styles from './StoreMap.module.scss'

const INITIAL_ZOOM = 14

const MARKER_SIZE = 34

const USER_MARKER_RADIUS = 9

const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const STORE_ICONS = Object.fromEntries(
  STORES.map((store) => [
    store.id,
    divIcon({
      className: styles.storeMarker,
      html: `<img src="${store.logo}" alt="" />`,
      iconSize: [MARKER_SIZE, MARKER_SIZE],
      popupAnchor: [0, -MARKER_SIZE / 2],
    }),
  ]),
)

function ResizeWithContainer() {
  const map = useMap()

  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])

  return null
}

interface StoreMapProps {
  origin: Coordinates
  located: boolean
  locations: NearbyLocation[]
}

function StoreMap({ origin, located, locations }: StoreMapProps) {
  return (
    <MapContainer className={styles.map} center={origin} zoom={INITIAL_ZOOM}>
      <ResizeWithContainer />
      <TileLayer url={MAP_TILES_URL} attribution={ATTRIBUTION} />
      {located && (
        <CircleMarker center={origin} radius={USER_MARKER_RADIUS} className={styles.userMarker}>
          <Popup>Estás aquí</Popup>
        </CircleMarker>
      )}
      {locations.map((location) => (
        <Marker key={location.id} position={location} icon={STORE_ICONS[location.store_id]} title={location.name}>
          <Popup>
            <strong>{location.name}</strong>
            <span className={styles.popupMeta}>{[location.address, formatDistance(location.distance)].filter(Boolean).join(' · ')}</span>
            <a href={directionsUrl(location)} target="_blank" rel="noreferrer">Cómo llegar</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default StoreMap
