import { useState, type SubmitEvent } from 'react'
import type { Credentials } from '../data/users'
import { ArrowRightEndOnRectangleIcon } from './icons'

interface LoginProps {
  onLogin: (credentials: Credentials) => void
  error?: string
}

function Login({ onLogin, error }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onLogin({ username: username.trim(), password })
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">MediClinic</h1>

        <div className="field">
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {error && (
          <p className="alert" role="alert">
            {error}
          </p>
        )}

        <button className="button button-primary" type="submit">
          <ArrowRightEndOnRectangleIcon />
          Ingresar
        </button>
      </form>
    </div>
  )
}

export default Login
