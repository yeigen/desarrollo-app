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
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from '@ionic/react'
import TaskStatusBadge from '../components/TaskStatusBadge'
import { useTasks } from '../hooks/useTasks'

function TaskDetail() {
  const { id } = useParams<{ id: string }>()
  const { tasks, updateTask, deleteTask } = useTasks()
  const router = useIonRouter()
  const [presentAlert] = useIonAlert()
  const task = tasks.find(item => item.id === Number(id))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle de la tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {task ? (
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
              <IonButton expand="block" onClick={() => updateTask(task.id, { completed: !task.completed })}>
                {task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
              </IonButton>
              <IonButton expand="block" fill="outline" routerLink={`/tasks/${task.id}/edit`}>
                Editar
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                color="danger"
                onClick={() => presentAlert({
                  header: `Eliminar "${task.title}"`,
                  buttons: [
                    { text: 'Volver', role: 'cancel' },
                    {
                      text: 'Eliminar tarea',
                      role: 'destructive',
                      handler: () => {
                        router.goBack()
                        deleteTask(task.id)
                      },
                    },
                  ],
                })}
              >
                Eliminar
              </IonButton>
            </div>
          </>
        ) : (
          <p className="ion-padding">La tarea no existe.</p>
        )}
      </IonContent>
    </IonPage>
  )
}

export default TaskDetail
