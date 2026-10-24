import { Navigate, Route } from 'react-router-dom'
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { flagOutline, podiumOutline, ribbonOutline } from 'ionicons/icons'
import Missions from '../pages/Missions/Missions'
import Ranking from '../pages/Ranking/Ranking'
import Results from '../pages/Results/Results'

function UserRoutes() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="missions" element={<Missions />} />
        <Route path="results" element={<Results />} />
        <Route path="ranking" element={<Ranking />} />
        <Route index element={<Navigate to="missions" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="missions" href="/tabs/missions">
          <IonIcon icon={flagOutline} aria-hidden="true" />
          <IonLabel>Misiones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="results" href="/tabs/results">
          <IonIcon icon={ribbonOutline} aria-hidden="true" />
          <IonLabel>Resultados</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ranking" href="/tabs/ranking">
          <IonIcon icon={podiumOutline} aria-hidden="true" />
          <IonLabel>Ranking</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default UserRoutes
