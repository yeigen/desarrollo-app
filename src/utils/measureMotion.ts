import type { Acceleration } from '@capacitor/motion'

const EARTH_GRAVITY = 9.81
const MOVING_THRESHOLD = 2
const SHAKING_THRESHOLD = 10

export type MotionState = 'rest' | 'moving' | 'shaking'

export function measureMotion({ x, y, z }: Acceleration) {
  const magnitude = Math.abs(Math.hypot(x, y, z) - EARTH_GRAVITY)
  let state: MotionState = 'rest'
  if (magnitude > MOVING_THRESHOLD) state = 'moving'
  if (magnitude > SHAKING_THRESHOLD) state = 'shaking'
  return { magnitude, state }
}
