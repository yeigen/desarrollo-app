import { createClient } from '@supabase/supabase-js'
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '../config'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

export function uniqueChannel(name: string) {
  return supabase.channel(`${name}:${crypto.randomUUID()}`)
}
