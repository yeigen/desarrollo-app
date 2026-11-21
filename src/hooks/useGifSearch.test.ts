import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { useGifSearch } from './useGifSearch'

interface PendingRequest {
  term: string
  signal: AbortSignal
  respond: (ids: string[]) => Promise<void>
}

let requests: PendingRequest[]

function giphyBody(ids: string[]) {
  return {
    data: ids.map(id => ({ id, title: id, images: { fixed_width: { url: `https://media.giphy.com/${id}.gif`, width: '200', height: '150' } } })),
    pagination: { total_count: ids.length },
  }
}

beforeEach(() => {
  vi.useFakeTimers()
  requests = []
  vi.stubGlobal('fetch', vi.fn((url: string, { signal }: RequestInit) => new Promise((resolve, reject) => {
    signal!.addEventListener('abort', () => reject(signal!.reason))
    requests.push({
      term: new URL(url).searchParams.get('q')!,
      signal: signal!,
      respond: async ids => {
        resolve(Response.json(giphyBody(ids)))
        await vi.runAllTimersAsync()
      },
    })
  })))
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

async function waitDebounce() {
  await act(() => vi.advanceTimersByTimeAsync(500))
}

test('cancela la búsqueda anterior y muestra solo los resultados de la última', async () => {
  const { result, rerender } = renderHook(({ term }) => useGifSearch(term), { initialProps: { term: 'gato' } })
  await waitDebounce()
  rerender({ term: 'perro' })
  await waitDebounce()

  expect(requests.map(request => request.term)).toEqual(['gato', 'perro'])
  expect(requests[0].signal.aborted).toBe(true)

  await act(() => requests[1].respond(['perro-1', 'perro-2']))

  expect(result.current.gifs.map(gif => gif.id)).toEqual(['perro-1', 'perro-2'])
  expect(result.current.error).toBe('')
  expect(result.current.loading).toBe(false)
})

test('no busca mientras el usuario sigue escribiendo', async () => {
  const { rerender } = renderHook(({ term }) => useGifSearch(term), { initialProps: { term: 'g' } })
  for (const term of ['ga', 'gat', 'gato']) {
    await act(() => vi.advanceTimersByTimeAsync(200))
    rerender({ term })
  }
  await waitDebounce()

  expect(requests.map(request => request.term)).toEqual(['gato'])
})

test('cancela la petición en curso al salir de la pantalla', async () => {
  const { unmount } = renderHook(() => useGifSearch('gato'))
  await waitDebounce()

  unmount()

  expect(requests[0].signal.aborted).toBe(true)
})
