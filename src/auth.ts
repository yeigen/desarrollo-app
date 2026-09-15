const VALID_EMAIL = 'user@mail.com'
const VALID_PASSWORD = '123'

export function validateCredentials(email: string, password: string) {
  return email === VALID_EMAIL && password === VALID_PASSWORD
}
