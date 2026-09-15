import { useState } from 'react'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import initialTasks from '../data/tasks'
import { logout } from '../auth'

function Home() {
  const [tasks, setTasks] = useState(initialTasks)
  const router = useIonRouter()

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

  const handleLogout = () => {
    logout()
    router.push('/login', 'root', 'replace')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </IonContent>
    </IonPage>
  )
}

export default Home
