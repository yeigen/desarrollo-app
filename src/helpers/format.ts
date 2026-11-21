const PRICE_FORMAT = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const NUMBER_FORMAT = new Intl.NumberFormat('es-CO')

const LIST_FORMAT = new Intl.ListFormat('es', { type: 'conjunction' })

const METERS_FORMAT = new Intl.NumberFormat('es-CO', { style: 'unit', unit: 'meter', maximumFractionDigits: 0 })

const KILOMETERS_FORMAT = new Intl.NumberFormat('es-CO', { style: 'unit', unit: 'kilometer', maximumFractionDigits: 1 })

const TIME_FORMAT = new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit' })

const DATE_FORMAT = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short' })

const METERS_PER_KILOMETER = 1000

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

export function formatDistance(meters: number) {
  return meters < METERS_PER_KILOMETER
    ? METERS_FORMAT.format(meters)
    : KILOMETERS_FORMAT.format(meters / METERS_PER_KILOMETER)
}

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0].toUpperCase()).join('')
}

export function firstName(name: string) {
  return name.split(' ')[0]
}

export function formatMessageTime(value: string) {
  const date = new Date(value)
  const today = new Date()
  const sameDay = date.toDateString() === today.toDateString()
  return sameDay ? TIME_FORMAT.format(date) : `${DATE_FORMAT.format(date)}, ${TIME_FORMAT.format(date)}`
}
