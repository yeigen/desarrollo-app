import { useParams } from 'react-router-dom'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import NetworkStatus from '../components/NetworkStatus'
import TaskForm from '../components/TaskForm'
import { useNetwork } from '../hooks/useNetwork'
import { useTasks } from '../hooks/useTasks'
import type { TaskValues } from '../types'

const EMPTY_TASK: TaskValues = { title: '', description: '' }

function TaskEditor() {
  const { id } = useParams<{ id: string }>()
  const { tasks, isPending, addTask, updateTask } = useTasks()
  const { isOnline } = useNetwork()
  const router = useIonRouter()
  const task = tasks.find(item => item.id === id)
  const isNew = id === undefined

  const handleSave = (values: TaskValues) => {
    if (task) updateTask(task.id, values)
    else addTask(values)
    router.goBack()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/tasks" />
          </IonButtons>
          <IonTitle>{isNew ? 'Nueva tarea' : 'Editar tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <NetworkStatus />
        {!isNew && isPending && (
          <div className="ion-padding ion-text-center">
            <IonSpinner aria-label="Cargando tarea" />
          </div>
        )}
        {!isNew && !isPending && !task && <p className="ion-padding">La tarea no existe.</p>}
        {(isNew || task) && (
          <TaskForm
            key={task?.id ?? 'new'}
            initialValues={task ?? EMPTY_TASK}
            disabled={!isOnline}
            onSave={handleSave}
          />
        )}
      </IonContent>
    </IonPage>
  )
}

export default TaskEditor
