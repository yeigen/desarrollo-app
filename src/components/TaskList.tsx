import { IonItem, IonLabel, IonList } from '@ionic/react'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <IonList>
      {tasks.map(task => (
        <IonItem key={task.id}>
          <IonLabel>{task.title}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  )
}

export default TaskList
