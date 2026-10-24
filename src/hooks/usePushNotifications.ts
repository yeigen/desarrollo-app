import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Capacitor } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications'
import { savePushToken } from '../services/push'

export function usePushNotifications(userId: string) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return

    const listeners = [
      PushNotifications.addListener('registration', ({ value }) => savePushToken(value)),
      PushNotifications.addListener('pushNotificationActionPerformed', ({ notification }) => {
        const ownerId = notification.data.ownerId
        navigate(ownerId === userId ? '/tabs/budget' : `/tabs/budget/${ownerId}`)
      }),
    ]

    PushNotifications.requestPermissions().then(({ receive }) => {
      if (receive === 'granted') PushNotifications.register()
    })

    return () => {
      listeners.forEach((listener) => listener.then((handle) => handle.remove()))
    }
  }, [navigate, userId])
}
