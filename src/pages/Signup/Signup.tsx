import { useState } from 'react'
import { IonButton, IonRouterLink } from '@ionic/react'
import AuthField from '../../components/auth/AuthField'
import AuthLayout from '../../components/auth/AuthLayout'
import { MIN_PASSWORD_LENGTH, isValidEmail, isValidPassword } from '../../helpers/validation'
import { useAuth } from '../../hooks/useAuth'

function Signup() {
  const { signUp } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmation: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const errors = {
    name: form.name.trim() ? '' : 'Escribe tu nombre.',
    email: isValidEmail(form.email) ? '' : 'Escribe un correo válido.',
    password: isValidPassword(form.password) ? '' : `Mínimo ${MIN_PASSWORD_LENGTH} caracteres.`,
    confirmation: form.confirmation && form.confirmation === form.password ? '' : 'Las contraseñas no coinciden.',
  }

  const errorOf = (field: keyof typeof errors) => (submitted ? errors[field] : '')
  const update = (field: keyof typeof form) => (value: string) => setForm({ ...form, [field]: value })

  const submit = async () => {
    setSubmitted(true)
    if (Object.values(errors).some(Boolean)) return
    setPending(true)
    setError(await signUp(form.name.trim(), form.email, form.password))
    setPending(false)
  }

  return (
    <AuthLayout
      onSubmit={submit}
      error={error}
      footer={<>¿Ya tienes cuenta? <IonRouterLink routerLink="/login">Iniciar sesión</IonRouterLink></>}
    >
      <AuthField label="Nombre" autocomplete="name" value={form.name} onChange={update('name')} error={errorOf('name')} />
      <AuthField label="Correo" type="email" autocomplete="email" value={form.email} onChange={update('email')} error={errorOf('email')} />
      <AuthField label="Contraseña" type="password" autocomplete="new-password" value={form.password} onChange={update('password')} error={errorOf('password')} />
      <AuthField label="Confirmar contraseña" type="password" autocomplete="new-password" value={form.confirmation} onChange={update('confirmation')} error={errorOf('confirmation')} />
      <IonButton type="submit" expand="block" disabled={pending}>Crear cuenta</IonButton>
    </AuthLayout>
  )
}

export default Signup
