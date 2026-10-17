import { useParams } from 'react-router-dom'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import NetworkStatus from '../components/NetworkStatus'
import TaskStatusBadge from '../components/TaskStatusBadge'
import { useConfirmDelete } from '../hooks/useConfirmDelete'
import { useNetwork } from '../hooks/useNetwork'
import { useTasks } from '../hooks/useTasks'

function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const { tasks, isPending, updateTask, deleteTask } = useTasks()
  const { isOnline } = useNetwork()
  const router = useIonRouter()
  const confirmDelete = useConfirmDelete()
  const task = tasks.find(item => item.id === id)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/tasks" />
          </IonButtons>
          <IonTitle>Detalle de la tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NetworkStatus />
        {isPending && (
          <div className="ion-padding ion-text-center">
            <IonSpinner aria-label="Cargando tarea" />
          </div>
        )}
        {!isPending && !task && <p className="ion-padding">La tarea no existe.</p>}
        {task && (
          <>
            <div className="ion-padding">
              <h1>{task.title}</h1>
              <p>{task.description || 'Sin descripción'}</p>
            </div>
            <IonList inset>
              <IonItem>
                <IonLabel>Estado</IonLabel>
                <TaskStatusBadge completed={task.completed} />
              </IonItem>
            </IonList>
            <div className="ion-padding-horizontal">
              <IonButton
                expand="block"
                disabled={!isOnline}
                onClick={() => updateTask(task.id, { completed: !task.completed })}
              >
                {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
              </IonButton>
              <IonButton
                expand="block"
                fill="outline"
                disabled={!isOnline}
                routerLink={`/tabs/tasks/${task.id}/edit`}
              >
                Editar
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                color="danger"
                disabled={!isOnline}
                onClick={() => confirmDelete(task.title, 'Eliminar tarea', () => {
                  router.goBack()
                  deleteTask(task.id)
                })}
              >
                Eliminar
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  )
}

export default TaskDetail
