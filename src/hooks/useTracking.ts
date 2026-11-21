import { useCallback, useEffect, useRef, useState } from 'react'
import type { Position } from '@capacitor/geolocation'
import { distanceInMeters, speedInKmh, type TrackPoint } from '../utils/geo'
import { measureMotion } from '../utils/measureMotion'
import { classifySpeed, dueAlerts, isBatteryLow, isResting, type AlertKind, type SentAlerts } from '../utils/trackingRules'
import { appendPoint, dayKey, trackFileName, type Session } from '../utils/tracks'
import { useAccelerometer } from './useAccelerometer'
import { useDevice } from './useDevice'
import { useFilesystem } from './useFilesystem'
import { useGeolocation } from './useGeolocation'
import { useHaptics } from './useHaptics'
import { useLocalNotifications } from './useLocalNotifications'
import { useNetwork } from './useNetwork'
import { usePluginCall } from './usePluginCall'

const TICK_MS = 10_000
const MIN_POINT_METERS = 5
const MAX_ACCURACY_METERS = 30

const ALERTS: Record<AlertKind, { title: string; body: string }> = {
  still: { title: 'Llevas un buen rato quieto', body: 'No te has movido en los últimos 5 minutos.' },
  offline: { title: 'Sin conexión', body: 'El recorrido se sigue guardando en el celular.' },
  fast: { title: 'Vas muy rápido', body: 'Tu velocidad pasó de 25 km/h.' },
}

const LOW_BATTERY_ALERT = { title: 'Rastreo detenido', body: 'La batería está baja y el rastreo se detuvo.' }

export interface TrackingAlert {
  title: string
  body: string
  time: number
}

export function useTracking() {
  const { position, error: geolocationError, getCurrentPosition, startTracking, stopTracking } = useGeolocation()
  const { acceleration, start: startAccelerometer, stop: stopAccelerometer } = useAccelerometer()
  const { vibrate } = useHaptics()
  const { requestPermission, notifyNow } = useLocalNotifications()
  const { battery, refresh: refreshBattery } = useDevice()
  const network = useNetwork()
  const { files, readText, writeJson } = useFilesystem()
  const { error, run } = usePluginCall()

  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [lastSpeedKmh, setSpeedKmh] = useState(0)
  const [now, setNow] = useState(() => Date.now())
  const [lastMotionAt, setLastMotionAt] = useState<number | null>(null)
  const [lastMoveAt, setLastMoveAt] = useState(() => Date.now())
  const [alerts, setAlerts] = useState<TrackingAlert[]>([])
  const startedAtRef = useRef(0)
  const lastPointRef = useRef<TrackPoint | null>(null)
  const sentAlertsRef = useRef<SentAlerts>({})

  const isTracking = startedAt !== null
  const isPaused = isTracking && isResting(lastMotionAt, now)
  const shouldWatch = isTracking && !isPaused
  const speedKmh = isPaused ? 0 : lastSpeedKmh

  const notify = useCallback((alert: { title: string; body: string }) => {
    notifyNow(alert.title, alert.body)
    setAlerts(current => [{ ...alert, time: Date.now() }, ...current])
  }, [notifyNow])

  const handlePosition = useCallback((newPosition: Position) => {
    if (newPosition.coords.accuracy > MAX_ACCURACY_METERS) return
    const point = { lat: newPosition.coords.latitude, lng: newPosition.coords.longitude, time: newPosition.timestamp }
    const previous = lastPointRef.current
    if (previous) setSpeedKmh(speedInKmh(previous, point))
    if (previous && distanceInMeters(previous, point) < MIN_POINT_METERS) return
    lastPointRef.current = point
    setLastMoveAt(point.time)
    setSessions(current => appendPoint(current, startedAtRef.current, point))
  }, [])

  useEffect(() => {
    getCurrentPosition()
  }, [getCurrentPosition])

  useEffect(() => {
    if (!shouldWatch) return
    startTracking(handlePosition)
    return stopTracking
  }, [shouldWatch, startTracking, stopTracking, handlePosition])

  useEffect(() => {
    if (!acceleration) return
    const isMoving = measureMotion(acceleration).state !== 'rest'
    setLastMotionAt(current => (isMoving || current === null ? Date.now() : current))
  }, [acceleration])

  useEffect(() => {
    if (!isTracking) return
    const timer = setInterval(() => {
      setNow(Date.now())
      refreshBattery()
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [isTracking, refreshBattery])

  useEffect(() => {
    if (startedAt === null || sessions.length === 0) return
    writeJson(trackFileName(dayKey(startedAt)), sessions)
  }, [startedAt, sessions, writeJson])

  useEffect(() => {
    if (!isTracking) return
    const due = dueAlerts({ now, lastMoveAt, speedKmh, connected: network.connected, sent: sentAlertsRef.current })
    due.forEach(kind => {
      sentAlertsRef.current[kind] = now
      notify(ALERTS[kind])
    })
  }, [isTracking, now, lastMoveAt, speedKmh, network.connected, notify])

  const stop = useCallback(() => {
    setStartedAt(null)
    stopAccelerometer()
  }, [stopAccelerometer])

  useEffect(() => {
    if (!isTracking || !isBatteryLow(battery)) return
    stop()
    notify(LOW_BATTERY_ALERT)
  }, [isTracking, battery, stop, notify])

  const start = () => run(async () => {
    const time = Date.now()
    const fileName = trackFileName(dayKey(time))
    const saved = files.some(file => file.name === fileName) ? (JSON.parse(await readText(fileName)) as Session[]) : []
    startedAtRef.current = time
    lastPointRef.current = null
    sentAlertsRef.current = {}
    setSessions(saved)
    setSpeedKmh(0)
    setNow(time)
    setLastMoveAt(time)
    setLastMotionAt(null)
    setAlerts([])
    setStartedAt(time)
    startAccelerometer()
    vibrate()
    await requestPermission()
    await refreshBattery()
  })

  const path = sessions.find(session => session.startedAt === startedAt)?.points ?? []

  return {
    position,
    path,
    isTracking,
    isPaused,
    speedKmh,
    movement: classifySpeed(speedKmh),
    battery,
    network,
    alerts,
    error: error || geolocationError,
    start,
    stop,
    locate: getCurrentPosition,
  }
}
