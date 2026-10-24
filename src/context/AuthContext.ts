import { createContext } from 'react'

export type Role = 'user' | 'admin'

export interface User {
  name: string
  email: string
  role: Role
}

export interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<string>
  signUp: (name: string, email: string, password: string) => Promise<string>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
