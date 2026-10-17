import { useState, type FormEvent } from 'react'
import { IonButton, IonInput, IonItem, IonList } from '@ionic/react'

interface FruitFormProps {
  initialName: string
  submitLabel: string
  onSave: (name: string) => void
  onCancel?: () => void
}

function FruitForm({ initialName, submitLabel, onSave, onCancel }: FruitFormProps) {
  const [name, setName] = useState(initialName)
  const cleanName = name.trim()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!cleanName) return
    onSave(cleanName)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <IonList inset>
        <IonItem>
          <IonInput
            label="Fruta"
            labelPlacement="stacked"
            placeholder="Ej: Mango"
            value={name}
            onIonInput={e => setName(e.detail.value ?? '')}
          />
        </IonItem>
      </IonList>
      <div className="ion-padding-horizontal">
        <IonButton type="submit" expand="block" disabled={!cleanName}>
          {submitLabel}
        </IonButton>
        {onCancel && (
          <IonButton expand="block" fill="clear" onClick={onCancel}>
            Cancelar edición
          </IonButton>
        )}
      </div>
    </form>
  )
}

export default FruitForm
