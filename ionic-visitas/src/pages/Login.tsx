import { useState, type SubmitEvent } from 'react'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react'
import { logInOutline } from 'ionicons/icons'
import type { Credentials } from '../data/users'

interface LoginProps {
  onLogin: (credentials: Credentials) => void
  error?: string
  onDismissError: () => void
}

function Login({ onLogin, error, onDismissError }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onLogin({ username: username.trim(), password })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediClinic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonInput
                label="Usuario"
                labelPlacement="floating"
                value={username}
                onIonInput={(event) => setUsername(event.detail.value ?? '')}
                autocomplete="username"
                required
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Contraseña"
                labelPlacement="floating"
                type="password"
                value={password}
                onIonInput={(event) => setPassword(event.detail.value ?? '')}
                autocomplete="current-password"
                required
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
          </IonList>

          <IonButton className="ion-margin-top" expand="block" type="submit">
            <IonIcon slot="start" icon={logInOutline} />
            Ingresar
          </IonButton>
        </form>

        <IonToast
          isOpen={Boolean(error)}
          message={error}
          duration={2500}
          color="danger"
          position="top"
          onDidDismiss={onDismissError}
        />
      </IonContent>
    </IonPage>
  )
}

export default Login
