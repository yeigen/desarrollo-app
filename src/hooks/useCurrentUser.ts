import { useAuth } from './useAuth'

export function useCurrentUser() {
  const { user } = useAuth()
  if (!user) throw new Error('useCurrentUser necesita una sesión iniciada')
  return user
}
