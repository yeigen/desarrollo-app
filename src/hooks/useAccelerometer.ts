import { useEffect, useState } from 'react'
import { Motion, type Acceleration } from '@capacitor/motion'
import { measureMotion } from '../utils/measureMotion'

export function useAccelerometer() {
  const [acceleration, setAcceleration] = useState<Acceleration | null>(null)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!isListening) return
    const listener = Motion.addListener('accel', event => setAcceleration(event.accelerationIncludingGravity))
    return () => {
      listener.then(handle => handle.remove())
    }
  }, [isListening])

  return {
    acceleration,
    motion: acceleration ? measureMotion(acceleration) : null,
    isListening,
    start: () => setIsListening(true),
    stop: () => setIsListening(false),
  }
}
