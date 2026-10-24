import { createContext } from 'react'
import type { useFirestoreProgress } from '../hooks/useFirestoreProgress'

export type ProgressContextValue = ReturnType<typeof useFirestoreProgress>

export const ProgressContext = createContext<ProgressContextValue | null>(null)
