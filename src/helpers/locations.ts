export interface Coordinates {
  lat: number
  lng: number
}

export interface StoreLocation extends Coordinates {
  id: string
  store_id: string
  name: string
  address: string | null
}

export interface NearbyLocation extends StoreLocation {
  distance: number
}

export const CALI_CENTER: Coordinates = { lat: 3.4516, lng: -76.532 }

const EARTH_RADIUS_METERS = 6371000

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

export function distanceInMeters(from: Coordinates, to: Coordinates) {
  const latDelta = toRadians(to.lat - from.lat)
  const lngDelta = toRadians(to.lng - from.lng)
  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(lngDelta / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(a))
}

export function nearbyLocations(locations: StoreLocation[], origin: Coordinates, isEnabled: (store: string) => boolean) {
  return locations
    .filter((location) => isEnabled(location.store_id))
    .map((location): NearbyLocation => ({ ...location, distance: distanceInMeters(origin, location) }))
    .sort((a, b) => a.distance - b.distance)
}

export function directionsUrl({ lat, lng }: Coordinates) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
}
