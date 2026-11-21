import { afterEach, expect, test, vi } from 'vitest'
import { searchGifs } from './giphy'

afterEach(() => {
  vi.unstubAllGlobals()
})

test('convierte la respuesta de GIPHY en GIFs con medidas numéricas', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({
    data: [{
      id: 'abc',
      title: 'Gato bailando',
      images: { fixed_width: { url: 'https://media.giphy.com/abc/200w.gif', width: '200', height: '113' } },
    }],
    pagination: { total_count: 840, count: 1, offset: 0 },
  })))

  const page = await searchGifs('gato', 0, new AbortController().signal)

  expect(page).toEqual({
    gifs: [{ id: 'abc', title: 'Gato bailando', url: 'https://media.giphy.com/abc/200w.gif', width: 200, height: 113 }],
    total: 840,
  })
})

test('falla con el estado HTTP cuando GIPHY rechaza la petición', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 429 })))

  await expect(searchGifs('gato', 0, new AbortController().signal)).rejects.toThrow('429')
})
