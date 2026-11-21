export interface Coordinates {
  lat: number
  lng: number
}

export interface TrackPoint extends Coordinates {
  time: number
}

const EARTH_RADIUS_METERS = 6_371_000
const METERS_PER_DEGREE = 111_320
const MS_PER_HOUR = 3_600_000
const METERS_PER_KM = 1000

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

export function distanceInMeters(from: Coordinates, to: Coordinates) {
  const latDelta = toRadians(to.lat - from.lat)
  const lngDelta = toRadians(to.lng - from.lng)
  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(lngDelta / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(a))
}

export function speedInKmh(from: TrackPoint, to: TrackPoint) {
  const elapsedMs = to.time - from.time
  if (elapsedMs <= 0) return 0
  return distanceInMeters(from, to) / METERS_PER_KM / (elapsedMs / MS_PER_HOUR)
}

export function pathLengthInMeters(points: Coordinates[]) {
  return points.slice(1).reduce((total, point, index) => total + distanceInMeters(points[index], point), 0)
}

export function boundsAround({ lat, lng }: Coordinates, radiusMeters: number) {
  const latDelta = radiusMeters / METERS_PER_DEGREE
  const lngDelta = radiusMeters / (METERS_PER_DEGREE * Math.cos(toRadians(lat)))
  return { south: lat - latDelta, west: lng - lngDelta, north: lat + latDelta, east: lng + lngDelta }
}
