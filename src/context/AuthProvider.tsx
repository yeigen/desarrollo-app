import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useFirebaseAuth()

  return <AuthContext value={auth}>{children}</AuthContext>
}

export default AuthProvider
