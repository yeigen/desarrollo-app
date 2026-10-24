import { useEffect, useState } from 'react'
import { Haptics } from '@capacitor/haptics'
import { Motion } from '@capacitor/motion'
import { useProgress } from './useProgress'
import { STILL_MISSION, STILL_SECONDS } from '../helpers/missions'
import { isMoving } from '../helpers/motion'

const STILL_MS = STILL_SECONDS * 1000
const VIBRATION_MS = 1000

export function useStillTimer() {
  const [active, setActive] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)
  const { complete } = useProgress()

  useEffect(() => {
    if (!active) return
    let stillSince = Date.now()
    let finished = false
    const listener = Motion.addListener('accel', event => {
      if (finished) return
      const now = Date.now()
      if (isMoving(event.accelerationIncludingGravity)) stillSince = now
      const left = STILL_MS - (now - stillSince)
      setRemaining(Math.max(Math.ceil(left / 1000), 0))
      if (left > 0) return
      finished = true
      setActive(false)
      Haptics.vibrate({ duration: VIBRATION_MS })
      complete(STILL_MISSION.id)
    })
    return () => {
      listener.then(handle => handle.remove())
    }
  }, [active, complete])

  const start = () => {
    setRemaining(null)
    setActive(true)
  }

  return { active, remaining, start }
}
