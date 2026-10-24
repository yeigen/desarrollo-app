import { useState, type ReactNode } from 'react'
import { StoresContext } from './StoresContext'

interface StoresProviderProps {
  children: ReactNode
}

function StoresProvider({ children }: StoresProviderProps) {
  const [disabled, setDisabled] = useState<string[]>([])

  const isEnabled = (store: string) => !disabled.includes(store)

  const setEnabled = (store: string, enabled: boolean) =>
    setDisabled((current) => (enabled ? current.filter((item) => item !== store) : [...current, store]))

  return <StoresContext value={{ isEnabled, setEnabled }}>{children}</StoresContext>
}

export default StoresProvider
