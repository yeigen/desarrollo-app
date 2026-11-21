import { GIPHY_API_KEY } from '../config'

const SEARCH_URL = 'https://api.giphy.com/v1/gifs/search'
export const PAGE_SIZE = 25

export interface Gif {
  id: string
  title: string
  url: string
  width: number
  height: number
}

export interface GifPage {
  gifs: Gif[]
  total: number
}

interface GiphySearchResponse {
  data: {
    id: string
    title: string
    images: { fixed_width: { url: string; width: string; height: string } }
  }[]
  pagination: { total_count: number }
}

export async function searchGifs(term: string, offset: number, signal: AbortSignal): Promise<GifPage> {
  const params = new URLSearchParams({
    api_key: GIPHY_API_KEY,
    q: term,
    limit: String(PAGE_SIZE),
    offset: String(offset),
    rating: 'g',
    lang: 'es',
  })
  const response = await fetch(`${SEARCH_URL}?${params}`, { signal })
  if (!response.ok) {
    throw new Error(`GIPHY respondió con el estado ${response.status}`)
  }
  const body: GiphySearchResponse = await response.json()
  return {
    gifs: body.data.map(({ id, title, images }) => ({
      id,
      title,
      url: images.fixed_width.url,
      width: Number(images.fixed_width.width),
      height: Number(images.fixed_width.height),
    })),
    total: body.pagination.total_count,
  }
}
