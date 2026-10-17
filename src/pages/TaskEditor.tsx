import { useParams } from 'react-router-dom'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import TaskForm from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'
import type { TaskValues } from '../types'

const EMPTY_TASK: TaskValues = { title: '', description: '' }

function TaskEditor() {
  const { id } = useParams<{ id: string }>()
  const { tasks, addTask, updateTask } = useTasks()
  const router = useIonRouter()
  const task = tasks.find(item => item.id === Number(id))
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
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{isNew ? 'Nueva tarea' : 'Editar tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isNew || task ? (
          <TaskForm key={task?.id ?? 'new'} initialValues={task ?? EMPTY_TASK} onSave={handleSave} />
        ) : (
          <p className="ion-padding">La tarea no existe.</p>
        )}
      </IonContent>
    </IonPage>
  )
}

export default TaskEditor
