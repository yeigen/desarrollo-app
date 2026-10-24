export const STORES = [
  { id: 'exito', name: 'Éxito' },
  { id: 'carulla', name: 'Carulla' },
  { id: 'olimpica', name: 'Olímpica' },
  { id: 'jumbo', name: 'Jumbo' },
  { id: 'd1', name: 'D1' },
  { id: 'mercamio', name: 'Mercamío' },
]

export function storeName(id: string) {
  return STORES.find((store) => store.id === id)?.name ?? id
}
