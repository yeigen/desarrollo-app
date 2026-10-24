import { FirebaseError } from 'firebase/app'

const ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/invalid-email': 'Escribe un correo válido.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
  'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos y vuelve a intentar.',
  'auth/network-request-failed': 'Sin conexión. Revisa tu internet e intenta de nuevo.',
}

export function authErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) throw error
  return ERROR_MESSAGES[error.code] ?? 'No pudimos completar la solicitud. Intenta de nuevo.'
}
