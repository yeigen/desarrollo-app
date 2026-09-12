import { Navigate, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { calendarOutline, peopleOutline, personCircleOutline } from 'ionicons/icons'
import Patients from './pages/Patients'
import Profile from './pages/Profile'
import Visits from './pages/Visits'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/palettes/dark.system.css'
import './theme/variables.css'

setupIonicReact()

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/visitas" element={<Visits />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/perfil" element={<Profile />} />
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
      </IonReactRouter>
    </IonApp>
  )
}

export default App
