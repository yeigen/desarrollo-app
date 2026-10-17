import { Navigate, Route } from 'react-router-dom'
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { checkboxOutline, nutritionOutline, peopleOutline } from 'ionicons/icons'
import Contacts from './Contacts'
import Fruits from './Fruits'
import TaskDetail from './TaskDetail'
import TaskEditor from './TaskEditor'
import Tasks from './Tasks'

function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="contacts" element={<Contacts />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/new" element={<TaskEditor />} />
        <Route path="tasks/:id" element={<TaskDetail />} />
        <Route path="tasks/:id/edit" element={<TaskEditor />} />
        <Route path="fruits" element={<Fruits />} />
        <Route index element={<Navigate to="contacts" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="contacts" href="/tabs/contacts">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Contactos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/tabs/tasks">
          <IonIcon icon={checkboxOutline} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="fruits" href="/tabs/fruits">
          <IonIcon icon={nutritionOutline} />
          <IonLabel>Frutas</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs
