import { useState } from 'react'
import { IonButton, IonRouterLink } from '@ionic/react'
import AuthField from '../../components/auth/AuthField'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuth } from '../../hooks/useAuth'

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
      error={error}
      footer={<>¿No tienes cuenta? <IonRouterLink routerLink="/signup">Crear cuenta</IonRouterLink></>}
    >
      <AuthField label="Correo" type="email" autocomplete="email" placeholder="tu@correo.com" value={email} onChange={setEmail} />
      <AuthField label="Contraseña" type="password" autocomplete="current-password" value={password} onChange={setPassword} />
      <IonButton type="submit" expand="block">Entrar</IonButton>
    </AuthLayout>
  )
}

export default Login
