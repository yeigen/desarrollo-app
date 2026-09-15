import { useState } from 'react'
import { IonButton, IonInput, IonItem } from '@ionic/react'

interface TaskFormProps {
  onAdd: (title: string) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')

  const handleAdd = () => {
    const cleanTitle = title.trim()
    if (!cleanTitle) return
    onAdd(cleanTitle)
    setTitle('')
  }

  return (
    <IonItem>
      <IonInput
        placeholder="Nueva tarea"
        value={title}
        onIonInput={e => setTitle(e.detail.value ?? '')}
      />
      <IonButton slot="end" onClick={handleAdd}>
        Agregar
      </IonButton>
    </IonItem>
  )
}

export default TaskForm
