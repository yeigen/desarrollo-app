import { useEffect, useState } from 'react'
import { LocalNotifications } from '@capacitor/local-notifications'
import type { PermissionState } from '@capacitor/core'
import { usePluginCall } from './usePluginCall'

const MAX_NOTIFICATION_ID = 2_147_483_647

const nextNotificationId = () => Date.now() % MAX_NOTIFICATION_ID

export function useLocalNotifications() {
  const [permission, setPermission] = useState<PermissionState>()
  const { error, run } = usePluginCall()

  useEffect(() => {
    run(async () => {
      setPermission((await LocalNotifications.checkPermissions()).display)
    })
  }, [run])

  const requestPermission = () => run(async () => {
    setPermission((await LocalNotifications.requestPermissions()).display)
  })

  const notifyNow = (title: string, body: string) => run(async () => {
    await LocalNotifications.schedule({
      notifications: [{ id: nextNotificationId(), title, body, isExactNotification: false }],
    })
  })

  const notifyIn = (title: string, body: string, delayMs: number) => run(async () => {
    await LocalNotifications.schedule({
      notifications: [{ id: nextNotificationId(), title, body, schedule: { at: new Date(Date.now() + delayMs) } }],
    })
  })

  return { permission, error, requestPermission, notifyNow, notifyIn }
}
