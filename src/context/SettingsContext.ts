import { createContext } from 'react'

export interface SettingsContextValue {
  vibrate: boolean
  setVibrate: (vibrate: boolean) => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)
