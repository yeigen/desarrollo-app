import { Navigate, Route } from 'react-router-dom'
import { IonBadge, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { Search as SearchIcon, Shield, ShoppingBasket, User as UserIcon } from 'lucide-react'
import AdminRoutes from './AdminRoutes'
import { TAB_BAR_ID } from '../config'
import Budget from '../pages/Budget/Budget'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import { useAuth } from '../hooks/useAuth'
import { useBudget } from '../hooks/useBudget'

const ICON_PROPS = { size: 24, strokeWidth: 1.8 }

function UserRoutes() {
  const { user } = useAuth()
  const { count } = useBudget()

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="search" element={<Search />} />
        <Route path="budget" element={<Budget />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route index element={<Navigate to="search" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" id={TAB_BAR_ID}>
        <IonTabButton tab="search" href="/tabs/search">
          <SearchIcon {...ICON_PROPS} />
          <IonLabel>Buscar</IonLabel>
        </IonTabButton>
        <IonTabButton tab="budget" href="/tabs/budget">
          <ShoppingBasket {...ICON_PROPS} />
          <IonLabel>Presupuesto</IonLabel>
          {count > 0 && <IonBadge>{count}</IonBadge>}
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <UserIcon {...ICON_PROPS} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
        {user?.role === 'admin' && (
          <IonTabButton tab="admin" href="/tabs/admin">
            <Shield {...ICON_PROPS} />
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  )
}

export default UserRoutes
