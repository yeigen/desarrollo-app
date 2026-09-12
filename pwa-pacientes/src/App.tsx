import { useState } from 'react'
import Login from './components/Login'
import type { Credentials } from './data/users'
import {
  authenticate,
  clearSession,
  loadSession,
  saveSession,
  type Session,
} from './services/auth'

function App() {
  const [session, setSession] = useState<Session | null>(loadSession)
  const [loginError, setLoginError] = useState<string>()

  const handleLogin = (credentials: Credentials) => {
    const user = authenticate(credentials)

    if (!user) {
      setLoginError('Usuario o contraseña incorrectos')
      return
    }

    setLoginError(undefined)
    setSession(saveSession(user))
  }

  const handleLogout = () => {
    clearSession()
    setSession(null)
  }

  if (!session) {
    return <Login onLogin={handleLogin} error={loginError} />
  }

  return (
    <header>
      <h1>MediClinic</h1>
      <p>Hola, {session.name}</p>
      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default App
