import { useState, type SubmitEvent } from 'react'

export interface Credentials {
  username: string
  password: string
}

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
    <form onSubmit={handleSubmit}>
      <h1>MediClinic</h1>

      <div>
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

      <div>
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

      {error && <p role="alert">{error}</p>}

      <button type="submit">Ingresar</button>
    </form>
  )
}

export default Login
