import { Navigate } from 'react-router-dom'
import { isLogged } from '../auth'

interface RequireAuthProps {
  children: React.ReactNode
}

function RequireAuth({ children }: RequireAuthProps) {
  if (!isLogged()) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default RequireAuth
