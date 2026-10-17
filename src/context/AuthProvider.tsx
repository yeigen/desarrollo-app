import type { ReactNode } from 'react'
import { IonSpinner } from '@ionic/react'
import { AuthContext } from './AuthContext'
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const auth = useFirebaseAuth()

  return (
    <AuthContext value={auth}>
      {auth.loading ? (
        <div className="ion-padding ion-text-center">
          <IonSpinner aria-label="Cargando sesión" />
        </div>
      ) : children}
    </AuthContext>
  )
}

export default AuthProvider
