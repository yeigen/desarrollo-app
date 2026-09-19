import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react'
import { isLogged, login, validateCredentials } from '../auth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useIonRouter()

  if (isLogged()) return <Navigate to="/home" replace />

  const handleLogin = () => {
    if (!validateCredentials(email.trim(), password)) {
      setError('Correo o contraseña incorrectos')
      return
    }
    setError('')
    login()
    router.push('/home', 'root', 'replace')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonInput
              label="Correo"
              labelPlacement="stacked"
              type="email"
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
          <IonButton expand="block" onClick={handleLogin}>
            Entrar
          </IonButton>
          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login
