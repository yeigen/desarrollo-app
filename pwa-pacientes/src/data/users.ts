export interface User {
  username: string
  password: string
  name: string
}

export type Credentials = Pick<User, 'username' | 'password'>

export const USERS: readonly User[] = [
  { username: 'admin', password: 'admin123', name: 'Administrador' },
  { username: 'recepcion', password: 'clinic2026', name: 'Recepción MediClinic' },
]
