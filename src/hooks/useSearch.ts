import { useEffect, useRef, useState } from 'react'
import { readCache, writeCache } from '../services/cache'
import { EMPTY_FILTERS, searchOffers, type SearchFilters, type SearchResult } from '../services/compriceApi'
import { supabase } from '../services/supabase'

const MAX_RECENT_SEARCHES = 5

const RECENT_KEY = 'recentSearches'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>(EMPTY_FILTERS)
  const [result, setResult] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [recent, setRecent] = useState<string[]>([])
  const lastRequest = useRef(0)

  useEffect(() => {
    readCache<string[]>(RECENT_KEY).then((saved) => saved && setRecent(saved))
  }, [])

  const run = async (nextQuery: string, nextFilters: SearchFilters) => {
    const request = ++lastRequest.current
    setQuery(nextQuery)
    setFilters(nextFilters)
    setLoading(true)
    setFailed(false)
    try {
      const data = await searchOffers(nextQuery, nextFilters)
      if (request === lastRequest.current) setResult(data)
    } catch {
      if (request === lastRequest.current) setFailed(true)
    } finally {
      if (request === lastRequest.current) setLoading(false)
    }
  }

  const search = (text: string) => {
    const nextQuery = text.trim()
    if (!nextQuery) return
    const nextRecent = [nextQuery, ...recent.filter((item) => item !== nextQuery)].slice(0, MAX_RECENT_SEARCHES)
    setRecent(nextRecent)
    writeCache(RECENT_KEY, nextRecent)
    supabase.from('searches').insert({}).then()
    run(nextQuery, filters)
  }

  const applyFilters = (nextFilters: SearchFilters) => {
    setFilters(nextFilters)
    if (query) run(query, nextFilters)
  }

  const retry = () => run(query, filters)

  return { query, filters, result, loading, failed, recent, search, applyFilters, retry }
}
