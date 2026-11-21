const METERS_PER_KM = 1000
const MS_PER_MINUTE = 60_000
const MINUTES_PER_HOUR = 60

export function formatDistance(meters: number) {
  if (meters < METERS_PER_KM) return `${Math.round(meters)} m`
  return `${(meters / METERS_PER_KM).toFixed(1)} km`
}

export function formatDuration(ms: number) {
  const minutes = Math.round(ms / MS_PER_MINUTE)
  if (minutes < MINUTES_PER_HOUR) return `${minutes} min`
  return `${Math.floor(minutes / MINUTES_PER_HOUR)} h ${minutes % MINUTES_PER_HOUR} min`
}
