export const MAX_MESSAGE_LENGTH = 500

export interface MessageValidation {
  body: string
  error: string
}

export function validateMessage(value: string): MessageValidation {
  const body = value.trim()
  if (!body) return { body, error: 'Escribe un mensaje.' }
  if (body.length > MAX_MESSAGE_LENGTH) {
    return { body, error: `El mensaje no puede pasar de ${MAX_MESSAGE_LENGTH} caracteres.` }
  }
  return { body, error: '' }
}
