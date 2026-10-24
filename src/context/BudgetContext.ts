import { createContext } from 'react'
import type { Offer } from '../services/compriceApi'

export interface BudgetItem {
  offer: Offer
  quantity: number
}

export interface Person {
  id: string
  name: string
  email: string
}

export interface BudgetContextValue {
  ownerId: string
  people: Person[]
  items: BudgetItem[]
  loading: boolean
  count: number
  total: number
  quantityOf: (offer: Offer) => number
  setQuantity: (offer: Offer, quantity: number) => void
  clear: () => void
  invite: (email: string) => Promise<string>
}

export const BudgetContext = createContext<BudgetContextValue | null>(null)
