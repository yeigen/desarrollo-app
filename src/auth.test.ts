import { validateCredentials } from './auth'

test('acepta las credenciales correctas', () => {
  expect(validateCredentials('user@mail.com', '123')).toBe(true)
})

test('rechaza credenciales incorrectas', () => {
  expect(validateCredentials('user@mail.com', '1234')).toBe(false)
  expect(validateCredentials('otro@mail.com', '123')).toBe(false)
})
