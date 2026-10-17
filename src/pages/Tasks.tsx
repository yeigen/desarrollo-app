import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonSpinner, IonText } from '@ionic/react'
import { add } from 'ionicons/icons'
import NetworkStatus from '../components/NetworkStatus'
import TabHeader from '../components/TabHeader'
import TaskList from '../components/TaskList'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useNetwork } from '../hooks/useNetwork'
import { useTasks } from '../hooks/useTasks'

function Tasks() {
  const user = useCurrentUser()
  const { isOnline } = useNetwork()
  const { tasks, isPending, error } = useTasks()

  return (
    <IonPage>
      <TabHeader title="Tareas" />
      <IonContent>
        <NetworkStatus />
        <p className="ion-padding-horizontal">Sesión iniciada como {user.email}</p>
        {error && (
          <IonText color="danger">
            <p className="ion-padding-horizontal" role="alert">{error}</p>
          </IonText>
        )}
        {isPending ? (
          <div className="ion-padding ion-text-center">
            <IonSpinner aria-label="Cargando tareas" />
          </div>
        ) : (
          <TaskList tasks={tasks} />
        )}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/tabs/tasks/new" disabled={!isOnline} aria-label="Agregar tarea">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Tasks
