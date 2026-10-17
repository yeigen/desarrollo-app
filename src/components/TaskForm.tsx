import { useState, type FormEvent } from 'react'
import { IonButton, IonInput, IonItem, IonList, IonTextarea } from '@ionic/react'
import type { TaskValues } from '../types'

interface TaskFormProps {
  initialValues: TaskValues
  onSave: (values: TaskValues) => void
}

function TaskForm({ initialValues, onSave }: TaskFormProps) {
  const [title, setTitle] = useState(initialValues.title)
  const [description, setDescription] = useState(initialValues.description)
  const cleanTitle = title.trim()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!cleanTitle) return
    onSave({ title: cleanTitle, description: description.trim() })
  }

  return (
    <form onSubmit={handleSubmit}>
      <IonList inset>
        <IonItem>
          <IonInput
            label="Título"
            labelPlacement="stacked"
            placeholder="¿Qué hay que hacer?"
            value={title}
            onIonInput={e => setTitle(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonTextarea
            label="Descripción"
            labelPlacement="stacked"
            placeholder="Detalles de la tarea"
            autoGrow
            value={description}
            onIonInput={e => setDescription(e.detail.value ?? '')}
          />
        </IonItem>
      </IonList>
      <div className="ion-padding-horizontal">
        <IonButton type="submit" expand="block" disabled={!cleanTitle}>
          Guardar
        </IonButton>
      </div>
    </form>
  )
}

export default TaskForm
