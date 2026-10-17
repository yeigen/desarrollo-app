import { Haptics, type ImpactStyle, type NotificationType } from '@capacitor/haptics'
import { usePluginCall } from './usePluginCall'

const VIBRATION_MS = 1000

export function useHaptics() {
  const { error, run } = usePluginCall()

  const impact = (style: ImpactStyle) => run(() => Haptics.impact({ style }))

  const notification = (type: NotificationType) => run(() => Haptics.notification({ type }))

  const vibrate = () => run(() => Haptics.vibrate({ duration: VIBRATION_MS }))

  return { error, impact, notification, vibrate }
}
