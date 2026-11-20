import { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation'
import type { Coordinates } from '../helpers/locations'

export function useCurrentPosition() {
  const [position, setPosition] = useState<Coordinates | null>()

  useEffect(() => {
    Geolocation.getCurrentPosition().then(
      ({ coords }) => setPosition({ lat: coords.latitude, lng: coords.longitude }),
      () => setPosition(null),
    )
  }, [])

  return position
}
