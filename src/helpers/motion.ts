import type { Acceleration } from '@capacitor/motion'

const EARTH_GRAVITY = 9.81
const MOVING_THRESHOLD = 2

export function isMoving({ x, y, z }: Acceleration) {
  return Math.abs(Math.hypot(x, y, z) - EARTH_GRAVITY) > MOVING_THRESHOLD
}
