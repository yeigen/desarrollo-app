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

export function formatCount(count: number, singular: string, plural: string) {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`
}

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0].toUpperCase()).join('')
}

export function firstName(name: string) {
  return name.split(' ')[0]
}
