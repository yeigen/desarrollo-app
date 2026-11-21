import { distanceInMeters, type Coordinates } from './geo'

const ADDRESS_REFRESH_METERS = 150

export interface GeocodeResult {
  formatted: string
  geometry: Coordinates
}

export interface Place extends Coordinates {
  name: string
  address: string
  distance: number
}

const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export function nearbyPlaces(results: GeocodeResult[], origin: Coordinates, query: string): Place[] {
  return results
    .map(({ formatted, geometry }) => {
      const [name, ...address] = formatted.split(', ')
      return { ...geometry, name, address: address.join(', '), distance: distanceInMeters(origin, geometry) }
    })
    .filter(place => normalize(place.name).includes(normalize(query)))
    .sort((a, b) => a.distance - b.distance)
}

export function shouldRefreshAddress(lastLookup: Coordinates | null, current: Coordinates) {
  return lastLookup === null || distanceInMeters(lastLookup, current) >= ADDRESS_REFRESH_METERS
}
