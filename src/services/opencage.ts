import { OPENCAGE_API_KEY } from '../config'
import { boundsAround, type Coordinates } from '../utils/geo'
import type { GeocodeResult } from '../utils/places'

const GEOCODE_URL = 'https://api.opencagedata.com/geocode/v1/json'
const LANGUAGE = 'es'
const NEARBY_RADIUS_METERS = 2000
const NEARBY_LIMIT = 10

export interface GeocodeResponse {
  status: { code: number; message: string }
  results: GeocodeResult[]
}

async function geocode(params: Record<string, string>): Promise<GeocodeResponse> {
  const query = new URLSearchParams({ ...params, key: OPENCAGE_API_KEY, language: LANGUAGE, no_annotations: '1' })
  const response = await fetch(`${GEOCODE_URL}?${query}`)
  return response.json()
}

export const reverseGeocode = ({ lat, lng }: Coordinates) => geocode({ q: `${lat},${lng}` })

export function searchNearby(text: string, center: Coordinates) {
  const { south, west, north, east } = boundsAround(center, NEARBY_RADIUS_METERS)
  return geocode({
    q: text,
    proximity: `${center.lat},${center.lng}`,
    bounds: `${west},${south},${east},${north}`,
    limit: String(NEARBY_LIMIT),
  })
}
