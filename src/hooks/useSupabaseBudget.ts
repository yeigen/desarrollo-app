import { useEffect, useRef, useState } from 'react'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import type { BudgetContextValue, BudgetItem, Person } from '../context/BudgetContext'
import { countUnits, totalPrice } from '../helpers/budget'
import { offerKey } from '../helpers/offers'
import type { Offer } from '../services/compriceApi'
import { supabase, uniqueChannel } from '../services/supabase'

interface ItemRow {
  offer_key: string
  offer: Offer
  quantity: number
}

const INVITE_ERRORS: Record<string, string> = {
  PT404: 'No encontramos una cuenta con ese correo.',
  '23514': 'Ese es tu correo: ya tienes acceso.',
}

async function fetchItems(ownerId: string) {
  const { data } = await supabase.from('budget_items').select('offer, quantity').eq('owner_id', ownerId).order('created_at')
  return data
}

async function fetchPeople(ownerId: string) {
  const [owner, members] = await Promise.all([
    supabase.from('profiles').select('id, name, email').eq('id', ownerId).single<Person>(),
    supabase
      .from('budget_members')
      .select('member:profiles!member_id(id, name, email)')
      .eq('owner_id', ownerId)
      .order('created_at')
      .overrideTypes<{ member: Person }[], { merge: false }>(),
  ])
  return owner.data ? [owner.data, ...(members.data ?? []).map((row) => row.member)] : []
}

function withItem(items: BudgetItem[], item: BudgetItem) {
  const key = offerKey(item.offer)
  return items.some((current) => offerKey(current.offer) === key)
    ? items.map((current) => (offerKey(current.offer) === key ? item : current))
    : [...items, item]
}

function withoutItem(items: BudgetItem[], key: string) {
  return items.filter((item) => offerKey(item.offer) !== key)
}

function applyChange(items: BudgetItem[], payload: RealtimePostgresChangesPayload<ItemRow>) {
  if (payload.eventType === 'DELETE') return withoutItem(items, payload.old.offer_key!)
  return withItem(items, { offer: payload.new.offer, quantity: payload.new.quantity })
}

export function useSupabaseBudget(ownerId: string): BudgetContextValue {
  const [items, setItems] = useState<BudgetItem[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const writes = useRef(Promise.resolve())

  useEffect(() => {
    fetchItems(ownerId).then((data) => {
      if (data) setItems(data)
      setLoading(false)
    })
    fetchPeople(ownerId).then(setPeople)

    const channel = uniqueChannel(`budget:${ownerId}`)
      .on<ItemRow>(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'budget_items', filter: `owner_id=eq.${ownerId}` },
        (payload) => setItems((current) => applyChange(current, payload)),
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'budget_members', filter: `owner_id=eq.${ownerId}` },
        () => fetchPeople(ownerId).then(setPeople),
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [ownerId])

  const write = (request: () => PromiseLike<{ error: unknown }>) => {
    writes.current = writes.current.then(async () => {
      const { error } = await request()
      if (!error) return
      const data = await fetchItems(ownerId)
      if (data) setItems(data)
    })
  }

  const quantityOf = (offer: Offer) => items.find((item) => offerKey(item.offer) === offerKey(offer))?.quantity ?? 0

  const setQuantity = (offer: Offer, quantity: number) => {
    const key = offerKey(offer)
    if (quantity > 0) {
      setItems((current) => withItem(current, { offer, quantity }))
      write(() => supabase.from('budget_items').upsert({ owner_id: ownerId, offer_key: key, offer, quantity }))
    } else {
      setItems((current) => withoutItem(current, key))
      write(() => supabase.from('budget_items').delete().match({ owner_id: ownerId, offer_key: key }))
    }
  }

  const clear = () => {
    setItems([])
    write(() => supabase.from('budget_items').delete().eq('owner_id', ownerId))
  }

  const invite = async (email: string) => {
    const { error } = await supabase.rpc('invite_to_budget', { email })
    if (!error) return ''
    return INVITE_ERRORS[error.code] ?? 'No pudimos compartir el presupuesto. Intenta de nuevo.'
  }

  return {
    ownerId,
    people,
    items,
    loading,
    count: countUnits(items),
    total: totalPrice(items),
    quantityOf,
    setQuantity,
    clear,
    invite,
  }
}
