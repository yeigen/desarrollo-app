import { useEffect, useState } from 'react'
import { Geolocation, type Position } from '@capacitor/geolocation'
import { usePluginCall } from './usePluginCall'

const POSITION_OPTIONS = { enableHighAccuracy: true }

export function useGeolocation() {
  const [position, setPosition] = useState<Position | null>(null)
  const [watchId, setWatchId] = useState('')
  const { error, setError, run } = usePluginCall()

  useEffect(() => {
    if (!watchId) return
    return () => {
      Geolocation.clearWatch({ id: watchId })
    }
  }, [watchId])

  const getCurrentPosition = () => run(async () => {
    setPosition(await Geolocation.getCurrentPosition(POSITION_OPTIONS))
  })

  const startTracking = () => run(async () => {
    const id = await Geolocation.watchPosition(POSITION_OPTIONS, (newPosition, watchError) => {
      if (watchError) setError(watchError.message)
      if (newPosition) setPosition(newPosition)
    })
    setWatchId(id)
  })

  const stopTracking = () => setWatchId('')

  return { position, isTracking: watchId !== '', error, getCurrentPosition, startTracking, stopTracking }
}
