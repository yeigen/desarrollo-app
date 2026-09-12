import { USERS, type Credentials, type User } from '../data/users'

export interface Session {
  username: string
  name: string
}

const SESSION_KEY = 'mediclinic.session'

export function authenticate({ username, password }: Credentials): User | null {
  const user = USERS.find(
    (candidate) => candidate.username === username && candidate.password === password,
  )
  return user ?? null
}

export function saveSession(user: User): Session {
  const session: Session = { username: user.username, name: user.name }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function loadSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Session
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
