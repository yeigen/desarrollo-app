import { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import TaskList from '../components/TaskList'
import initialTasks from '../data/tasks'

function Home() {
  const [tasks] = useState(initialTasks)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TaskList tasks={tasks} />
      </IonContent>
    </IonPage>
  )
}

export default Home
