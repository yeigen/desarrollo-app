import type { BudgetItem } from '../context/BudgetContext'

export const MAX_QUANTITY = 999

export function countUnits(items: BudgetItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function totalPrice(items: BudgetItem[]) {
  return items.reduce((sum, item) => sum + item.offer.price * item.quantity, 0)
}
