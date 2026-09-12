import type { Session } from '../services/auth'
import { ArrowRightStartOnRectangleIcon } from './icons'
import Patients from './Patients'

interface HomeProps {
  session: Session
  onLogout: () => void
}

function Home({ session, onLogout }: HomeProps) {
  return (
    <>
      <header className="app-header">
        <h1 className="app-header-brand">MediClinic</h1>
        <div className="app-header-user">
          <p>Hola, {session.name}</p>
          <button className="button button-ghost" type="button" onClick={onLogout}>
            <ArrowRightStartOnRectangleIcon />
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="main">
        <Patients />
      </main>
    </>
  )
}

export default Home
