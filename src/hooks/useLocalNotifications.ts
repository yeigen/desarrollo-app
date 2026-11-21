import { useCallback } from 'react'
import { LocalNotifications } from '@capacitor/local-notifications'
import { usePluginCall } from './usePluginCall'

const MAX_NOTIFICATION_ID = 2_147_483_647

const nextNotificationId = () => Date.now() % MAX_NOTIFICATION_ID

export function useLocalNotifications() {
  const { error, run } = usePluginCall()

  const requestPermission = useCallback(() => run(async () => {
    await LocalNotifications.requestPermissions()
  }), [run])

  const notifyNow = useCallback((title: string, body: string) => run(async () => {
    await LocalNotifications.schedule({
      notifications: [{ id: nextNotificationId(), title, body, isExactNotification: false }],
    })
  }), [run])

  return { error, requestPermission, notifyNow }
}
