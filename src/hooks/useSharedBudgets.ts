import { useCallback, useEffect, useRef, useState } from 'react'
import { useIonViewWillEnter } from '@ionic/react'
import type { BudgetItem } from '../context/BudgetContext'
import { countUnits, totalPrice } from '../helpers/budget'
import { readCache, writeCache } from '../services/cache'
import { supabase, uniqueChannel } from '../services/supabase'

const SHARED_KEY = 'sharedBudgets'

export interface SharedBudget {
  ownerId: string
  ownerName: string
  count: number
  total: number
}

interface SharedRow {
  owner: { id: string; name: string; budget_items: BudgetItem[] }
}

async function fetchSharedBudgets(userId: string) {
  const { data } = await supabase
    .from('budget_members')
    .select('owner:profiles!owner_id(id, name, budget_items(offer, quantity))')
    .eq('member_id', userId)
    .order('created_at')
    .overrideTypes<SharedRow[], { merge: false }>()
  return data?.map(({ owner }) => ({
    ownerId: owner.id,
    ownerName: owner.name,
    count: countUnits(owner.budget_items),
    total: totalPrice(owner.budget_items),
  }))
}

export function useSharedBudgets(userId: string) {
  const [budgets, setBudgets] = useState<SharedBudget[]>([])
  const fetched = useRef(false)

  const load = useCallback(
    () =>
      fetchSharedBudgets(userId).then((data) => {
        if (!data) return
        fetched.current = true
        setBudgets(data)
        writeCache(SHARED_KEY, data)
      }),
    [userId],
  )

  useIonViewWillEnter(() => {
    load()
  })

  useEffect(() => {
    readCache<SharedBudget[]>(SHARED_KEY).then((cached) => {
      if (cached && !fetched.current) setBudgets(cached)
    })

    const channel = uniqueChannel(`shared:${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'budget_members', filter: `member_id=eq.${userId}` },
        load,
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, load])

  return budgets
}
