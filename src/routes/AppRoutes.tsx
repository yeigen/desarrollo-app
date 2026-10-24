import { Navigate, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import UserRoutes from './UserRoutes'
import BudgetProvider from '../context/BudgetProvider'
import StoresProvider from '../context/StoresProvider'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import { useAuth } from '../hooks/useAuth'

function AppRoutes() {
  const { user, loading } = useAuth()
  const redirect = loading ? null : <Navigate to={user ? '/tabs' : '/login'} replace />

  return (
    <IonRouterOutlet>
      <Route path="/login" element={user ? <Navigate to="/tabs" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/tabs" replace /> : <Signup />} />
      <Route
        path="/tabs/*"
        element={
          user ? (
            <StoresProvider>
              <BudgetProvider ownerId={user.id}>
                <UserRoutes />
              </BudgetProvider>
            </StoresProvider>
          ) : (
            redirect
          )
        }
      />
      <Route path="*" element={redirect} />
    </IonRouterOutlet>
  )
}

export default AppRoutes
