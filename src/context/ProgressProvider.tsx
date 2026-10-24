import type { ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { ProgressContext } from './ProgressContext'
import { useFirestoreProgress } from '../hooks/useFirestoreProgress'

interface ProgressProviderProps {
  user: User
  children: ReactNode
}

function ProgressProvider({ user, children }: ProgressProviderProps) {
  const progress = useFirestoreProgress(user)

  return <ProgressContext value={progress}>{children}</ProgressContext>
}

export default ProgressProvider
