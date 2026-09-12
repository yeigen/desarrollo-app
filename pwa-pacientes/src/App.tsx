import Home from './components/Home'
import Login from './components/Login'
import { useAuth } from './hooks/useAuth'

function App() {
  const { session, loginError, login, logout } = useAuth()

  if (!session) {
    return <Login onLogin={login} error={loginError} />
  }

  return <Home session={session} onLogout={logout} />
}

export default App
