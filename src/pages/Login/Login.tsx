import { useState } from 'react'
import { IonButton, IonRouterLink } from '@ionic/react'
import { TriangleAlert } from 'lucide-react'
import AuthField from '../../components/auth/AuthField'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.scss'

function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    if (!email || !password) {
      setError('Escribe tu correo y contraseña para entrar.')
      return
    }
    signIn(email)
  }

  return (
    <AuthLayout
      onSubmit={submit}
      footer={<>¿No tienes cuenta? <IonRouterLink routerLink="/signup">Crear cuenta</IonRouterLink></>}
    >
      {error && (
        <div role="alert" className={styles.alert}>
          <TriangleAlert size={16} />
          {error}
        </div>
      )}
      <AuthField label="Correo" type="email" autocomplete="email" placeholder="tu@correo.com" value={email} onChange={setEmail} />
      <AuthField label="Contraseña" type="password" autocomplete="current-password" value={password} onChange={setPassword} />
      <IonButton type="submit" expand="block">Entrar</IonButton>
    </AuthLayout>
  )
}

export default Login
