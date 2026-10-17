import { IonItem, IonLabel } from '@ionic/react'
import TaskStatusBadge from './TaskStatusBadge'
import type { Task } from '../types'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <IonItem routerLink={`/tabs/tasks/${task.id}`} detail>
      <IonLabel className={task.completed ? 'completed' : undefined}>
        <h2>{task.title}</h2>
        {task.description && <p>{task.description}</p>}
      </IonLabel>
      <TaskStatusBadge completed={task.completed} />
    </IonItem>
  )
}

export default TaskItem
