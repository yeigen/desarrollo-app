import { useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { PushNotifications, type PushNotificationSchema } from '@capacitor/push-notifications'
import { usePluginCall } from './usePluginCall'

export function usePushNotifications() {
  const [token, setToken] = useState('')
  const [lastNotification, setLastNotification] = useState<PushNotificationSchema>()
  const { error, setError, run } = usePluginCall()
  const isSupported = Capacitor.isNativePlatform()

  useEffect(() => {
    if (!isSupported) return
    const listeners = [
      PushNotifications.addListener('registration', ({ value }) => setToken(value)),
      PushNotifications.addListener('registrationError', registrationError => setError(registrationError.error)),
      PushNotifications.addListener('pushNotificationReceived', setLastNotification),
    ]
    return () => {
      listeners.forEach(listener => listener.then(handle => handle.remove()))
    }
  }, [isSupported, setError])

  const register = () => run(async () => {
    const permission = await PushNotifications.requestPermissions()
    if (permission.receive !== 'granted') {
      setError('Sin permiso para recibir notificaciones')
      return
    }
    await PushNotifications.register()
  })

  return { isSupported, token, lastNotification, error, register }
}
