import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { useSupabaseAuth } from '../hooks/useSupabaseAuth'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useSupabaseAuth()

  return <AuthContext value={auth}>{children}</AuthContext>
}

export default AuthProvider
