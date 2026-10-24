import { useState, type ReactNode } from 'react'
import { SettingsContext } from './SettingsContext'

interface SettingsProviderProps {
  children: ReactNode
}

function SettingsProvider({ children }: SettingsProviderProps) {
  const [vibrate, setVibrate] = useState(true)

  return <SettingsContext value={{ vibrate, setVibrate }}>{children}</SettingsContext>
}

export default SettingsProvider
