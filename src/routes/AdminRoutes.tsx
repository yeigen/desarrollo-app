import { Navigate, Route } from 'react-router-dom'
import { IonRouterOutlet } from '@ionic/react'
import Admin from '../pages/Admin/Admin'
import { useAuth } from '../hooks/useAuth'

function AdminRoutes() {
  const { user } = useAuth()

  if (user?.role !== 'admin') return <Navigate to="/tabs/search" replace />

  return (
    <IonRouterOutlet ionPage>
      <Route index element={<Admin />} />
    </IonRouterOutlet>
  )
}

export default AdminRoutes
