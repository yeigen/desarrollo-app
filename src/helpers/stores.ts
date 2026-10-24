export const STORES = [
  { id: 'exito', name: 'Éxito', logo: '/logos/exito.png' },
  { id: 'carulla', name: 'Carulla', logo: '/logos/carulla.ico' },
  { id: 'olimpica', name: 'Olímpica', logo: '/logos/olimpica.png' },
  { id: 'jumbo', name: 'Jumbo', logo: '/logos/jumbo.ico' },
  { id: 'd1', name: 'D1', logo: '/logos/d1.ico' },
  { id: 'mercamio', name: 'Mercamío', logo: '/logos/mercamio.svg' },
]

export function storeName(id: string) {
  return STORES.find((store) => store.id === id)?.name ?? id
}

export function storeLogo(id: string) {
  return STORES.find((store) => store.id === id)?.logo
}
