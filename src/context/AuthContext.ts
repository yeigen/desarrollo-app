import { createContext } from 'react'

export type Role = 'user' | 'admin'

export interface User {
  name: string
  email: string
  role: Role
}

export interface AuthContextValue {
  user: User | null
  signIn: (email: string) => void
  signUp: (name: string, email: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
