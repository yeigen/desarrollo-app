import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { AuthContextValue, Role, User } from '../context/AuthContext'
import { authErrorMessage } from '../helpers/auth'
import { clearCache, readCache, writeCache } from '../services/cache'
import { removePushToken } from '../services/push'
import { supabase } from '../services/supabase'

const PROFILE_KEY = 'profile'

interface Profile {
  id: string
  name: string
  role: Role
}

export function useSupabaseAuth(): AuthContextValue {
  const [session, setSession] = useState<Session | null>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const userId = session?.user.id

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return
    readCache<Profile>(PROFILE_KEY).then((cached) => {
      if (cached?.id === userId) setProfile((current) => (current?.id === userId ? current : cached))
    })
    supabase
      .from('profiles')
      .select('id, name, role')
      .eq('id', userId)
      .single<Profile>()
      .then(({ data }) => {
        if (!data) return
        setProfile(data)
        writeCache(PROFILE_KEY, data)
      })
  }, [userId])

  const user: User | null =
    session && profile?.id === session.user.id
      ? { id: profile.id, name: profile.name, email: session.user.email ?? '', role: profile.role }
      : null

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return authErrorMessage(error)
  }

  const signUp = async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    return authErrorMessage(error)
  }

  const signOut = async () => {
    await removePushToken()
    await supabase.auth.signOut()
    await clearCache()
  }

  return { user, loading: session === undefined || (session !== null && !user), signIn, signUp, signOut }
}
