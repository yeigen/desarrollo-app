import type { AuthError } from '@supabase/supabase-js'
import { MIN_PASSWORD_LENGTH } from './validation'

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: 'Correo o contraseña incorrectos.',
  user_already_exists: 'Ya existe una cuenta con ese correo.',
  weak_password: `La contraseña debe tener mínimo ${MIN_PASSWORD_LENGTH} caracteres.`,
  over_request_rate_limit: 'Demasiados intentos. Espera unos minutos y vuelve a intentar.',
}

export function authErrorMessage(error: AuthError | null) {
  if (!error) return ''
  return ERROR_MESSAGES[error.code ?? ''] ?? 'No pudimos completar la solicitud. Intenta de nuevo.'
}
