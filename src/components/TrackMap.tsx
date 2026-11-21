import { useEffect } from 'react'
import { divIcon } from 'leaflet'
import { CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_TILES_URL } from '../config'
import type { Coordinates } from '../utils/geo'
import type { Place } from '../utils/places'
import styles from './TrackMap.module.css'

const INITIAL_ZOOM = 16
const USER_MARKER_RADIUS = 9
const PLACE_MARKER_SIZE = 18
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const PATH_STYLE = { color: '#3880ff', weight: 5 }

const PLACE_ICON = divIcon({
  className: styles.placeMarker,
  iconSize: [PLACE_MARKER_SIZE, PLACE_MARKER_SIZE],
  popupAnchor: [0, -PLACE_MARKER_SIZE / 2],
})

function ResizeWithContainer() {
  const map = useMap()

  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize())
    observer.observe(map.getContainer())
    return () => observer.disconnect()
  }, [map])

  return null
}

function FollowCenter({ lat, lng }: Coordinates) {
  const map = useMap()

  useEffect(() => {
    map.setView([lat, lng], map.getZoom())
  }, [map, lat, lng])

  return null
}

interface TrackMapProps {
  center: Coordinates
  user?: Coordinates
  paths: Coordinates[][]
  places?: Place[]
}

function TrackMap({ center, user, paths, places = [] }: TrackMapProps) {
  return (
    <MapContainer className={styles.map} center={center} zoom={INITIAL_ZOOM}>
      <ResizeWithContainer />
      <FollowCenter lat={center.lat} lng={center.lng} />
      <TileLayer url={MAP_TILES_URL} attribution={ATTRIBUTION} />
      {paths.map((path, index) => (
        <Polyline key={index} positions={path} pathOptions={PATH_STYLE} />
      ))}
      {user && (
        <CircleMarker center={user} radius={USER_MARKER_RADIUS} className={styles.userMarker}>
          <Popup>Estás aquí</Popup>
        </CircleMarker>
      )}
      {places.map(place => (
        <Marker key={`${place.lat},${place.lng}`} position={place} icon={PLACE_ICON} title={place.name}>
          <Popup>
            <strong>{place.name}</strong>
            <br />
            {place.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default TrackMap
