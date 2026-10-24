import { Navigate, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import UserRoutes from './UserRoutes'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import { useAuth } from '../hooks/useAuth'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <IonRouterOutlet>
      <Route path="/login" element={user ? <Navigate to="/tabs" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/tabs" replace /> : <Signup />} />
      <Route path="/tabs/*" element={user ? <UserRoutes /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to={user ? '/tabs' : '/login'} replace />} />
    </IonRouterOutlet>
  )
}

export default AppRoutes
