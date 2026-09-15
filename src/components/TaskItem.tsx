import { IonButton, IonCheckbox, IonItem } from '@ionic/react'
import type { Task } from '../types'

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <IonItem>
      <IonCheckbox
        labelPlacement="end"
        justify="start"
        checked={task.completed}
        onIonChange={() => onToggle(task.id)}
      >
        {task.title}
      </IonCheckbox>
      <IonButton slot="end" fill="clear" color="danger" onClick={() => onDelete(task.id)}>
        Eliminar
      </IonButton>
    </IonItem>
  )
}

export default TaskItem
