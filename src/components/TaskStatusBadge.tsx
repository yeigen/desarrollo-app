import { IonBadge } from '@ionic/react'

interface TaskStatusBadgeProps {
  completed: boolean
}

function TaskStatusBadge({ completed }: TaskStatusBadgeProps) {
  return (
    <IonBadge slot="end" color={completed ? 'success' : 'medium'}>
      {completed ? 'Completada' : 'Pendiente'}
    </IonBadge>
  )
}

export default TaskStatusBadge
