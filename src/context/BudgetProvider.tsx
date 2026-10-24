import type { ReactNode } from 'react'
import { BudgetContext } from './BudgetContext'
import { useSupabaseBudget } from '../hooks/useSupabaseBudget'

interface BudgetProviderProps {
  ownerId: string
  children: ReactNode
}

function BudgetProvider({ ownerId, children }: BudgetProviderProps) {
  const budget = useSupabaseBudget(ownerId)

  return <BudgetContext value={budget}>{children}</BudgetContext>
}

export default BudgetProvider
