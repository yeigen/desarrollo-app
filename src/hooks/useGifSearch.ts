import { useCallback, useEffect, useRef, useState } from 'react'
import { searchGifs, type Gif } from '../services/giphy'

const DEBOUNCE_MS = 500

export function useGifSearch(term: string) {
  const [query, setQuery] = useState('')
  const [gifs, setGifs] = useState<Gif[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setQuery(term.trim()), DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [term])

  const load = useCallback(async (offset: number) => {
    const controller = new AbortController()
    controllerRef.current = controller
    setLoading(true)
    setError('')
    try {
      const page = await searchGifs(query, offset, controller.signal)
      setGifs(previous => offset === 0 ? page.gifs : [...previous, ...page.gifs])
      setTotal(page.total)
      setLoading(false)
    } catch (err) {
      if (controller.signal.aborted) return
      setError((err as Error).message)
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    setGifs([])
    setTotal(0)
    setError('')
    setLoading(false)
    if (query) load(0)
    return () => controllerRef.current?.abort()
  }, [query, load])

  return {
    query,
    gifs,
    loading,
    error,
    hasMore: gifs.length < total,
    loadMore: () => load(gifs.length),
  }
}
