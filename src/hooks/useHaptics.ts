import { Haptics } from '@capacitor/haptics'
import { usePluginCall } from './usePluginCall'

const VIBRATION_MS = 1000

export function useHaptics() {
  const { error, run } = usePluginCall()

  const vibrate = () => run(() => Haptics.vibrate({ duration: VIBRATION_MS }))

  return { error, vibrate }
}
