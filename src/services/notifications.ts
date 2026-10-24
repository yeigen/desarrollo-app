import { LocalNotifications } from '@capacitor/local-notifications'

const MAX_NOTIFICATION_ID = 2_147_483_647

interface Message {
  title: string
  body: string
}

export const requestNotificationPermission = () => LocalNotifications.requestPermissions()

export function notify(messages: Message[]) {
  const firstId = Date.now() % MAX_NOTIFICATION_ID
  return LocalNotifications.schedule({
    notifications: messages.map((message, index) => ({ id: firstId + index, ...message, isExactNotification: false })),
  })
}
