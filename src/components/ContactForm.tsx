import { useState, type FormEvent } from 'react'
import { IonButton, IonInput, IonItem, IonList } from '@ionic/react'
import type { ContactValues } from '../types'

interface ContactFormProps {
  initialValues: ContactValues
  submitLabel: string
  disabled: boolean
  onSave: (values: ContactValues) => void
  onCancel?: () => void
}

function ContactForm({ initialValues, submitLabel, disabled, onSave, onCancel }: ContactFormProps) {
  const [name, setName] = useState(initialValues.name)
  const [phone, setPhone] = useState(initialValues.phone)
  const cleanName = name.trim()
  const cleanPhone = phone.trim()
  const isComplete = cleanName !== '' && cleanPhone !== ''

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (disabled || !isComplete) return
    onSave({ name: cleanName, phone: cleanPhone })
    setName('')
    setPhone('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <IonList inset>
        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            placeholder="Nombre del contacto"
            value={name}
            onIonInput={e => setName(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="stacked"
            type="tel"
            placeholder="300 123 4567"
            value={phone}
            onIonInput={e => setPhone(e.detail.value ?? '')}
          />
        </IonItem>
      </IonList>
      <div className="ion-padding-horizontal">
        <IonButton type="submit" expand="block" disabled={disabled || !isComplete}>
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

export default ContactForm
