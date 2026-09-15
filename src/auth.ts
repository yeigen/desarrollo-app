const VALID_EMAIL = 'user@mail.com'
const VALID_PASSWORD = '123'
const LOGGED_KEY = 'logged'

export function validateCredentials(email: string, password: string) {
  return email === VALID_EMAIL && password === VALID_PASSWORD
}

export function isLogged() {
  return localStorage.getItem(LOGGED_KEY) === 'true'
}

export function login() {
  localStorage.setItem(LOGGED_KEY, 'true')
}

export function logout() {
  localStorage.removeItem(LOGGED_KEY)
}
