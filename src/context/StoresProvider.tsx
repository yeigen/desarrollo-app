import type { ReactNode } from 'react'
import { StoresContext } from './StoresContext'
import { useSupabaseStores } from '../hooks/useSupabaseStores'

interface StoresProviderProps {
  children: ReactNode
}

function StoresProvider({ children }: StoresProviderProps) {
  const stores = useSupabaseStores()

  return <StoresContext value={stores}>{children}</StoresContext>
}

export default StoresProvider
