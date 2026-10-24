import { createContext } from 'react'
import type { Offer } from '../services/compriceApi'

export interface BudgetItem {
  offer: Offer
  quantity: number
}

export interface BudgetContextValue {
  items: BudgetItem[]
  count: number
  quantityOf: (offer: Offer) => number
  setQuantity: (offer: Offer, quantity: number) => void
}

export const BudgetContext = createContext<BudgetContextValue | null>(null)
