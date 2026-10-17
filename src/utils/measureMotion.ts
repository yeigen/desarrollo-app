import type { Acceleration } from '@capacitor/motion'

const MOVING_THRESHOLD = 2
const SHAKING_THRESHOLD = 15

export type MotionState = 'rest' | 'moving' | 'shaking'

export function measureMotion({ x, y, z }: Acceleration) {
  const magnitude = Math.hypot(x, y, z)
  let state: MotionState = 'rest'
  if (magnitude > MOVING_THRESHOLD) state = 'moving'
  if (magnitude > SHAKING_THRESHOLD) state = 'shaking'
  return { magnitude, state }
}
