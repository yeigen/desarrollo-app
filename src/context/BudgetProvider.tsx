import { useState, type ReactNode } from 'react'
import { BudgetContext, type BudgetItem } from './BudgetContext'
import { offerKey } from '../helpers/offers'
import type { Offer } from '../services/compriceApi'

interface BudgetProviderProps {
  children: ReactNode
}

function BudgetProvider({ children }: BudgetProviderProps) {
  const [itemsByKey, setItemsByKey] = useState<Record<string, BudgetItem>>({})
  const items = Object.values(itemsByKey)

  const quantityOf = (offer: Offer) => itemsByKey[offerKey(offer)]?.quantity ?? 0

  const setQuantity = (offer: Offer, quantity: number) =>
    setItemsByKey((current) => {
      const next = { ...current }
      if (quantity > 0) next[offerKey(offer)] = { offer, quantity }
      else delete next[offerKey(offer)]
      return next
    })

  const clear = () => setItemsByKey({})

  const count = items.reduce((sum, item) => sum + item.quantity, 0)

  const total = items.reduce((sum, item) => sum + item.offer.price * item.quantity, 0)

  return <BudgetContext value={{ items, count, total, quantityOf, setQuantity, clear }}>{children}</BudgetContext>
}

export default BudgetProvider
