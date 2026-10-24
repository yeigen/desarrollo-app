import { useEffect, useRef, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'
import { usePluginCall } from './usePluginCall'
import { useProgress } from './useProgress'
import { distanceInMeters, type Point } from '../helpers/geo'
import { MIN_DISTANCE_METERS, WALK_MISSION } from '../helpers/missions'

const POSITION_OPTIONS = { enableHighAccuracy: true }
const MAX_ACCURACY_METERS = 20

export function useWalkTracker() {
  const [watchId, setWatchId] = useState('')
  const [distance, setDistance] = useState<number | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const origin = useRef<Point | null>(null)
  const { complete } = useProgress()
  const { error, setError, run } = usePluginCall()

  useEffect(() => {
    if (!watchId) return
    return () => {
      Geolocation.clearWatch({ id: watchId })
    }
  }, [watchId])

  const start = () => run(async () => {
    origin.current = null
    setDistance(null)
    const id = await Geolocation.watchPosition(POSITION_OPTIONS, (position, watchError) => {
      if (watchError) setError(watchError.message)
      if (!position) return
      setAccuracy(position.coords.accuracy)
      if (position.coords.accuracy > MAX_ACCURACY_METERS) return
      origin.current ??= position.coords
      const meters = distanceInMeters(origin.current, position.coords)
      setDistance(meters)
      if (meters <= MIN_DISTANCE_METERS) return
      setWatchId('')
      complete(WALK_MISSION.id)
    })
    setWatchId(id)
  })

  return { tracking: watchId !== '', distance, accuracy, maxAccuracy: MAX_ACCURACY_METERS, error, start }
}
