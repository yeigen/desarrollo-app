import { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import initialTasks from '../data/tasks'

function Home() {
  const [tasks, setTasks] = useState(initialTasks)

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
