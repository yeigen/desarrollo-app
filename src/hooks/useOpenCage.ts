import { useCallback, useState } from 'react'
import { OPENCAGE_API_KEY } from '../config'
import { reverseGeocode, searchNearby, type GeocodeResponse } from '../services/opencage'
import type { Coordinates } from '../utils/geo'
import { nearbyPlaces, type Place } from '../utils/places'

const HTTP_OK = 200

export function useOpenCage() {
  const [address, setAddress] = useState('')
  const [places, setPlaces] = useState<Place[]>([])
  const [error, setError] = useState('')
  const isConfigured = OPENCAGE_API_KEY !== ''

  const call = useCallback(async (request: () => Promise<GeocodeResponse>) => {
    setError('')
    const response = await request().catch((requestError: unknown) => {
      if (!(requestError instanceof TypeError)) throw requestError
      return null
    })
    if (!response) {
      setError('No se pudo conectar con OpenCage')
      return null
    }
    if (response.status.code !== HTTP_OK) {
      setError(`OpenCage respondió: ${response.status.message}`)
      return null
    }
    return response
  }, [])

  const lookupAddress = useCallback(async (coords: Coordinates) => {
    const response = await call(() => reverseGeocode(coords))
    if (response) setAddress(response.results[0]?.formatted ?? 'Sin dirección para esta posición')
    return response?.results[0]?.formatted ?? ''
  }, [call])

  const searchPlaces = async (query: string, origin: Coordinates) => {
    const response = await call(() => searchNearby(query, origin))
    if (response) setPlaces(nearbyPlaces(response.results, origin, query))
  }

  return { isConfigured, address, places, error, lookupAddress, searchPlaces }
}
