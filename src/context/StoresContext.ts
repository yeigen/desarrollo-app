import { createContext } from 'react'

export interface StoresContextValue {
  isEnabled: (store: string) => boolean
  setEnabled: (store: string, enabled: boolean) => void
}

export const StoresContext = createContext<StoresContextValue | null>(null)
