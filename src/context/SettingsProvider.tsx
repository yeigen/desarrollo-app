import { useEffect, useState, type ReactNode } from 'react'
import { Preferences } from '@capacitor/preferences'
import { SettingsContext } from './SettingsContext'

const VIBRATE_KEY = 'vibrate'

interface SettingsProviderProps {
  children: ReactNode
}

function SettingsProvider({ children }: SettingsProviderProps) {
  const [vibrate, setVibrateState] = useState(true)

  useEffect(() => {
    Preferences.get({ key: VIBRATE_KEY }).then(({ value }) => {
      if (value) setVibrateState(value === 'true')
    })
  }, [])

  const setVibrate = (value: boolean) => {
    setVibrateState(value)
    Preferences.set({ key: VIBRATE_KEY, value: String(value) })
  }

  return <SettingsContext value={{ vibrate, setVibrate }}>{children}</SettingsContext>
}

export default SettingsProvider
