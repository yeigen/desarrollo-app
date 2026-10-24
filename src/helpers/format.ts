const PRICE_FORMAT = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const NUMBER_FORMAT = new Intl.NumberFormat('es-CO')

const LIST_FORMAT = new Intl.ListFormat('es', { type: 'conjunction' })

export function formatPrice(value: number) {
  return PRICE_FORMAT.format(value)
}

export function formatNumber(value: number) {
  return NUMBER_FORMAT.format(value)
}

export function formatList(items: string[]) {
  return LIST_FORMAT.format(items)
}
