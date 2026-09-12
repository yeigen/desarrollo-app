import type { Session } from '../services/auth'
import Patients from './Patients'

interface HomeProps {
  session: Session
  onLogout: () => void
}

function Home({ session, onLogout }: HomeProps) {
  return (
    <>
      <header>
        <h1>MediClinic</h1>
        <p>Hola, {session.name}</p>
        <button type="button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </header>

      <main>
        <Patients />
      </main>
    </>
  )
}

export default Home
