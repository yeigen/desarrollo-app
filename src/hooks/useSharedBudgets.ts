import { useEffect, useState } from 'react'
import { useIonViewWillEnter } from '@ionic/react'
import type { BudgetItem } from '../context/BudgetContext'
import { countUnits, totalPrice } from '../helpers/budget'
import { supabase, uniqueChannel } from '../services/supabase'

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

  useIonViewWillEnter(() => {
    fetchSharedBudgets(userId).then((data) => data && setBudgets(data))
  })

  useEffect(() => {
    const channel = uniqueChannel(`shared:${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'budget_members', filter: `member_id=eq.${userId}` },
        () => fetchSharedBudgets(userId).then((data) => data && setBudgets(data)),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return budgets
}
