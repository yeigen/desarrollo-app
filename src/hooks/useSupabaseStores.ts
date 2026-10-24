import { useEffect, useState } from 'react'
import type { StoresContextValue } from '../context/StoresContext'
import { supabase, uniqueChannel } from '../services/supabase'

interface StoreRow {
  id: string
  enabled: boolean
}

async function fetchDisabledStores() {
  const { data } = await supabase.from('stores').select('id').eq('enabled', false)
  return data?.map((store) => store.id)
}

function withStore(disabled: string[], store: StoreRow) {
  const others = disabled.filter((id) => id !== store.id)
  return store.enabled ? others : [...others, store.id]
}

export function useSupabaseStores(): StoresContextValue {
  const [disabled, setDisabled] = useState<string[]>([])

  useEffect(() => {
    const load = () => fetchDisabledStores().then((data) => data && setDisabled(data))

    const channel = uniqueChannel('stores')
      .on<StoreRow>(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'stores' },
        (payload) => setDisabled((current) => withStore(current, payload.new)),
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') load()
      })

    load()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const isEnabled = (store: string) => !disabled.includes(store)

  const setEnabled = async (store: string, enabled: boolean) => {
    setDisabled((current) => withStore(current, { id: store, enabled }))
    const { error } = await supabase.from('stores').update({ enabled }).eq('id', store)
    if (!error) return
    const data = await fetchDisabledStores()
    if (data) setDisabled(data)
  }

  return { isEnabled, setEnabled }
}
