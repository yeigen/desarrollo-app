import type { Offer } from '../services/compriceApi'
import { formatNumber, formatPrice } from './format'

const BASE_UNITS_PER_LARGE_UNIT = 1000

const UNIT_LABELS = { g: 'kg', ml: 'L', un: 'und' }

const DAY_FORMAT = new Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', year: 'numeric' })

export function offerKey(offer: Offer) {
  return [offer.store, offer.branch, offer.product_id ?? offer.ean ?? offer.name].join(':')
}

export function formatAmount(offer: Offer) {
  if (!offer.amount || !offer.unit) return ''
  if (offer.unit === 'un') return `${formatNumber(offer.amount)} und`
  if (offer.amount < BASE_UNITS_PER_LARGE_UNIT) return `${formatNumber(offer.amount)} ${offer.unit}`
  return `${formatNumber(offer.amount / BASE_UNITS_PER_LARGE_UNIT)} ${UNIT_LABELS[offer.unit]}`
}

export function formatPricePerUnit(offer: Offer) {
  if (!offer.price_per_unit || !offer.unit) return ''
  return `${formatPrice(offer.price_per_unit)}/${UNIT_LABELS[offer.unit]}`
}

export function formatSeenAt(offer: Offer) {
  if (!offer.seen_at) return ''
  const day = DAY_FORMAT.format(new Date(offer.seen_at))
  return day === DAY_FORMAT.format(new Date()) ? 'Visto hoy' : `Visto el ${day}`
}
