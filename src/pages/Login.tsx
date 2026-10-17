import { Navigate } from 'react-router-dom'
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { user, login } = useAuth()

  if (user) return <Navigate to="/tasks" replace />

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AuthForm submitLabel="Entrar" onSubmit={login} />
        <div className="ion-padding-horizontal">
          <IonButton expand="block" fill="clear" routerLink="/register">
            Crear una cuenta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login
