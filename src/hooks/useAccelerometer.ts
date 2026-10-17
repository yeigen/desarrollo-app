import { useEffect, useState } from 'react'
import { Motion, type Acceleration } from '@capacitor/motion'
import { measureMotion } from '../utils/measureMotion'

const AT_REST: Acceleration = { x: 0, y: 0, z: 0 }

export function useAccelerometer() {
  const [acceleration, setAcceleration] = useState(AT_REST)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!isListening) return
    const listener = Motion.addListener('accel', event => setAcceleration(event.acceleration))
    return () => {
      listener.then(handle => handle.remove())
    }
  }, [isListening])

  return {
    acceleration,
    ...measureMotion(acceleration),
    isListening,
    start: () => setIsListening(true),
    stop: () => setIsListening(false),
  }
}
