import type { Session } from '../services/auth'

interface HomeProps {
  session: Session
  onLogout: () => void
}

function Home({ session, onLogout }: HomeProps) {
  return (
    <header>
      <h1>MediClinic</h1>
      <p>Hola, {session.name}</p>
      <button type="button" onClick={onLogout}>
        Cerrar sesión
      </button>
    </header>
  )
}

export default Home
