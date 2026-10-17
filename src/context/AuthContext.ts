import { createContext } from 'react'
import type { useFirebaseAuth } from '../hooks/useFirebaseAuth'

export type AuthContextValue = ReturnType<typeof useFirebaseAuth>

export const AuthContext = createContext<AuthContextValue | null>(null)
