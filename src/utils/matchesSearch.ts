const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim()

export function matchesSearch(text: string, search: string) {
  return normalize(text).includes(normalize(search))
}
