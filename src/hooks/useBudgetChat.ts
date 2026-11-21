import { useEffect, useState } from 'react'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { validateMessage } from '../helpers/chat'
import { readCache, writeCache } from '../services/cache'
import { supabase, uniqueChannel } from '../services/supabase'

export interface ChatMessage {
  id: number
  senderId: string
  body: string
  createdAt: string
}

interface MessageRow {
  id: number
  owner_id: string
  sender_id: string
  body: string
  created_at: string
}

const FETCH_LIMIT = 100
const CACHE_LIMIT = 50

function toMessage(row: MessageRow): ChatMessage {
  return {
    id: row.id,
    senderId: row.sender_id,
    body: row.body,
    createdAt: row.created_at,
  }
}

function withMessage(messages: ChatMessage[], message: ChatMessage) {
  return messages.some((current) => current.id === message.id) ? messages : [...messages, message]
}

async function fetchMessages(ownerId: string) {
  const { data } = await supabase
    .from('budget_messages')
    .select('id, owner_id, sender_id, body, created_at')
    .eq('owner_id', ownerId)
    .order('id', { ascending: false })
    .limit(FETCH_LIMIT)

  return ((data ?? []) as MessageRow[]).map(toMessage).reverse()
}

export function useBudgetChat(ownerId: string, senderId: string, enabled: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!enabled || !senderId) return

    let fetched = false

    setLoading(true)

    readCache<ChatMessage[]>(`chat:${ownerId}`).then((cached) => {
      if (!cached || fetched) return
      setMessages(cached)
      setLoading(false)
    })

    const load = () => {
      fetchMessages(ownerId).then((data) => {
        fetched = true
        setMessages(data)
        setLoading(false)
      })
    }

    load()

    const channel = uniqueChannel(`chat:${ownerId}`)
      .on<MessageRow>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'budget_messages', filter: `owner_id=eq.${ownerId}` },
        (payload: RealtimePostgresChangesPayload<MessageRow>) => {
          setMessages((current) => withMessage(current, toMessage(payload.new as MessageRow)))
        },
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') load()
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [enabled, ownerId, senderId])

  useEffect(() => {
    if (!enabled || loading || messages.length === 0) return
    writeCache(`chat:${ownerId}`, messages.slice(-CACHE_LIMIT))
  }, [enabled, loading, messages, ownerId])

  const send = async (value: string) => {
    const { body, error } = validateMessage(value)
    if (error) return error
    if (!senderId) return 'No hay una sesión activa.'

    const { data, error: insertError } = await supabase
      .from('budget_messages')
      .insert({ owner_id: ownerId, sender_id: senderId, body })
      .select('id, owner_id, sender_id, body, created_at')
      .single()

    if (insertError || !data) return 'No pudimos enviar el mensaje. Intenta de nuevo.'

    setMessages((current) => withMessage(current, toMessage(data as MessageRow)))
    return ''
  }

  return { messages, loading, send }
}
