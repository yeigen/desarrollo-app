import { useState } from 'react'
import type { Credentials } from '../data/users'
import {
  authenticate,
  clearSession,
  loadSession,
  saveSession,
  type Session,
} from '../services/auth'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(loadSession)
  const [loginError, setLoginError] = useState<string>()

  const login = (credentials: Credentials) => {
    const user = authenticate(credentials)

    if (!user) {
      setLoginError('Usuario o contraseña incorrectos')
      return
    }

    setLoginError(undefined)
    setSession(saveSession(user))
  }

  const logout = () => {
    clearSession()
    setSession(null)
  }

  const clearLoginError = () => setLoginError(undefined)

  return { session, loginError, login, logout, clearLoginError }
}
