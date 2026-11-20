import { useEffect, useState } from 'react'
import type { StoreLocation } from '../helpers/locations'
import { supabase } from '../services/supabase'

export function useSupabaseLocations() {
  const [locations, setLocations] = useState<StoreLocation[] | null>(null)

  useEffect(() => {
    supabase
      .from('store_locations')
      .select('id, store_id, name, address, lat, lng')
      .then(({ data }) => setLocations(data ?? []))
  }, [])

  return locations
}
