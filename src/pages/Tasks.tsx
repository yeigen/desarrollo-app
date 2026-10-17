import { useState } from 'react'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import initialTasks from '../data/tasks'
import { useAuth } from '../hooks/useAuth'

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const { user, logout } = useAuth()

  const addTask = (title: string) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false }])
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p className="ion-padding-horizontal">Sesión iniciada como {user?.email}</p>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </IonContent>
    </IonPage>
  )
}

export default Tasks
