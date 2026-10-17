import { IonList } from '@ionic/react'
import TaskItem from './TaskItem'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="ion-padding ion-text-center">No hay tareas todavía.</p>
  }

  return (
    <IonList inset>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </IonList>
  )
}

export default TaskList
