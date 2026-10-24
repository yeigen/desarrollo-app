import { readCache, writeCache } from './cache'
import { supabase } from './supabase'

const TOKEN_KEY = 'pushToken'

export type PushEvent = { type: 'invite'; memberId: string } | { type: 'item'; ownerId: string; offerKey: string }

export async function savePushToken(token: string) {
  await writeCache(TOKEN_KEY, token)
  await supabase.rpc('save_push_token', { token })
}

export async function removePushToken() {
  const token = await readCache<string>(TOKEN_KEY)
  if (token) await supabase.from('push_tokens').delete().eq('token', token)
}

export function notifyBudget(event: PushEvent) {
  return supabase.functions.invoke('send-push', { body: event })
}
