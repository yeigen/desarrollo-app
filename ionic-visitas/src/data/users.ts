export interface User {
  username: string
  password: string
  name: string
  specialty: string
}

export type Credentials = Pick<User, 'username' | 'password'>

export const USERS: readonly User[] = [
  {
    username: 'dra.perez',
    password: 'medico123',
    name: 'Dra. Laura Pérez',
    specialty: 'Medicina general',
  },
]
