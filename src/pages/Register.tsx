import { Navigate } from 'react-router-dom'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../hooks/useAuth'

function Register() {
  const { user, register } = useAuth()

  if (user) return <Navigate to="/tasks" replace />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AuthForm submitLabel="Registrarme" onSubmit={register} />
        <div className="ion-padding-horizontal">
          <IonButton expand="block" fill="clear" routerLink="/login" routerDirection="back">
            Ya tengo una cuenta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Register
