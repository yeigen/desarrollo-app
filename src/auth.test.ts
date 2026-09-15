import { isLogged, login, logout, validateCredentials } from './auth'

beforeEach(() => {
  localStorage.clear()
})

test('acepta las credenciales correctas', () => {
  expect(validateCredentials('user@mail.com', '123')).toBe(true)
})

test('rechaza credenciales incorrectas', () => {
  expect(validateCredentials('user@mail.com', '1234')).toBe(false)
  expect(validateCredentials('otro@mail.com', '123')).toBe(false)
})

test('sin sesion guardada no esta logueado', () => {
  expect(isLogged()).toBe(false)
})

test('login guarda la sesion y logout la borra', () => {
  login()
  expect(localStorage.getItem('logged')).toBe('true')
  expect(isLogged()).toBe(true)
  logout()
  expect(localStorage.getItem('logged')).toBeNull()
  expect(isLogged()).toBe(false)
})
