import { Navigate, Route } from 'react-router-dom'
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { calendarOutline, peopleOutline, personCircleOutline } from 'ionicons/icons'
import type { Session } from '../services/auth'
import Patients from '../pages/Patients'
import Profile from '../pages/Profile'
import Visits from '../pages/Visits'

interface TabsProps {
  session: Session
  onLogout: () => void
}

function Tabs({ session, onLogout }: TabsProps) {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/visitas" element={<Visits />} />
        <Route path="/pacientes" element={<Patients />} />
        <Route path="/perfil" element={<Profile session={session} onLogout={onLogout} />} />
        <Route path="/" element={<Navigate to="/visitas" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/visitas">
          <IonIcon aria-hidden="true" icon={calendarOutline} />
          <IonLabel>Visitas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="pacientes" href="/pacientes">
          <IonIcon aria-hidden="true" icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil" href="/perfil">
          <IonIcon aria-hidden="true" icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs
