import { useState, type FormEvent } from 'react'
import { FirebaseError } from 'firebase/app'
import { IonButton, IonInput, IonItem, IonList, IonText } from '@ionic/react'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Correo o contraseña incorrectos',
  'auth/invalid-email': 'Escribe un correo válido',
  'auth/missing-password': 'Escribe la contraseña',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
  'auth/too-many-requests': 'Demasiados intentos, espera un momento y vuelve a intentarlo',
  'auth/network-request-failed': 'Sin conexión a internet',
}

interface AuthFormProps {
  submitLabel: string
  onSubmit: (email: string, password: string) => Promise<unknown>
}

function AuthForm({ submitLabel, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    try {
      await onSubmit(email.trim(), password)
    } catch (submitError) {
      if (!(submitError instanceof FirebaseError)) throw submitError
      setError(AUTH_ERROR_MESSAGES[submitError.code] ?? submitError.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <IonList inset>
        <IonItem>
          <IonInput
            label="Correo"
            labelPlacement="stacked"
            type="email"
            autocomplete="email"
            placeholder="usuario@correo.com"
            value={email}
            onIonInput={e => setEmail(e.detail.value ?? '')}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="stacked"
            type="password"
            value={password}
            onIonInput={e => setPassword(e.detail.value ?? '')}
          />
        </IonItem>
      </IonList>
      <div className="ion-padding-horizontal">
        <IonButton type="submit" expand="block">
          {submitLabel}
        </IonButton>
        {error && (
          <IonText color="danger">
            <p role="alert">{error}</p>
          </IonText>
        )}
      </div>
    </form>
  )
}

export default AuthForm
