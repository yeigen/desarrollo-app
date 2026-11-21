import type { BatteryInfo } from '@capacitor/device'

const STILL_SPEED_KMH = 1
const FAST_SPEED_KMH = 25
const REST_BEFORE_PAUSE_MS = 60_000
const LOW_BATTERY_LEVEL = 0.15
const STILL_ALERT_MS = 5 * 60_000
const ALERT_COOLDOWN_MS = 10 * 60_000

export type Movement = 'still' | 'moving' | 'fast'

export type AlertKind = 'still' | 'offline' | 'fast'

export type SentAlerts = Partial<Record<AlertKind, number>>

export function classifySpeed(speedKmh: number): Movement {
  if (speedKmh >= FAST_SPEED_KMH) return 'fast'
  if (speedKmh >= STILL_SPEED_KMH) return 'moving'
  return 'still'
}

export function isResting(lastMotionAt: number | null, now: number) {
  return lastMotionAt !== null && now - lastMotionAt >= REST_BEFORE_PAUSE_MS
}

export function isBatteryLow(battery?: BatteryInfo) {
  return battery?.batteryLevel !== undefined && battery.batteryLevel <= LOW_BATTERY_LEVEL && !battery.isCharging
}

interface AlertInput {
  now: number
  lastMoveAt: number
  speedKmh: number
  connected: boolean
  sent: SentAlerts
}

export function dueAlerts({ now, lastMoveAt, speedKmh, connected, sent }: AlertInput): AlertKind[] {
  const conditions: Record<AlertKind, boolean> = {
    still: now - lastMoveAt >= STILL_ALERT_MS,
    offline: !connected,
    fast: classifySpeed(speedKmh) === 'fast',
  }
  const kinds = Object.keys(conditions) as AlertKind[]
  return kinds.filter(kind => conditions[kind] && now - (sent[kind] ?? -Infinity) >= ALERT_COOLDOWN_MS)
}
