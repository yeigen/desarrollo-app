import { useState, type ReactNode } from 'react'
import { AuthContext, type User } from './AuthContext'

const ADMIN_EMAIL = 'admin@comprice.co'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = (email: string) => {
    const isAdmin = email.trim().toLowerCase() === ADMIN_EMAIL
    setUser({ email, name: isAdmin ? 'Admin comprice' : 'Laura Gómez', role: isAdmin ? 'admin' : 'user' })
  }

  const signUp = (name: string, email: string) => setUser({ name, email, role: 'user' })

  const signOut = () => setUser(null)

  return <AuthContext value={{ user, signIn, signUp, signOut }}>{children}</AuthContext>
}

export default AuthProvider
