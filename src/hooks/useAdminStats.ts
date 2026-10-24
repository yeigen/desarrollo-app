import { useState } from 'react'
import { useIonViewWillEnter } from '@ionic/react'
import { supabase } from '../services/supabase'

export interface AdminStats {
  users: number
  searches_today: number
  shared_budgets: number
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null)

  useIonViewWillEnter(() => {
    supabase
      .rpc('admin_stats')
      .single<AdminStats>()
      .then(({ data }) => data && setStats(data))
  })

  return stats
}
