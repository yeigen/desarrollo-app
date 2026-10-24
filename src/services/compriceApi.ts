import { COMPRICE_API_URL } from '../config'

export type Unit = 'g' | 'ml' | 'un'

export type SortKey = 'price_per_unit' | 'price' | 'name'

export interface Offer {
  store: string
  branch: string | null
  name: string
  brand: string | null
  ean: string | null
  product_id: string | null
  price: number
  list_price: number | null
  amount: number | null
  unit: Unit | null
  price_per_unit: number | null
  image: string | null
  url: string | null
  seen_at: string | null
}

export interface SearchResult {
  query: string
  offers: Offer[]
  stores_without_response: string[]
}

export interface SearchFilters {
  stores: string[]
  unit: Unit | null
  minPrice: string
  maxPrice: string
  minPricePerUnit: string
  maxPricePerUnit: string
  sort: SortKey
}

export const EMPTY_FILTERS: SearchFilters = {
  stores: [],
  unit: null,
  minPrice: '',
  maxPrice: '',
  minPricePerUnit: '',
  maxPricePerUnit: '',
  sort: 'price_per_unit',
}

export async function searchOffers(query: string, filters: SearchFilters): Promise<SearchResult> {
  const params = new URLSearchParams({ q: query, sort: filters.sort })
  filters.stores.forEach((store) => params.append('stores', store))
  if (filters.unit) params.set('unit', filters.unit)
  const ranges = {
    min_price: filters.minPrice,
    max_price: filters.maxPrice,
    min_price_per_unit: filters.minPricePerUnit,
    max_price_per_unit: filters.maxPricePerUnit,
  }
  Object.entries(ranges).forEach(([name, value]) => {
    if (value) params.set(name, value)
  })

  const response = await fetch(`${COMPRICE_API_URL}/search?${params}`)
  if (!response.ok) throw new Error(`La API respondió ${response.status}`)
  return response.json()
}
