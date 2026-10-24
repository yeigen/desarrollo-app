import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import type { AuthContextValue, Role, User } from '../context/AuthContext'
import { authErrorMessage } from '../helpers/auth'
import { supabase } from '../services/supabase'

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
    supabase
      .from('profiles')
      .select('id, name, role')
      .eq('id', userId)
      .single()
      .then(({ data }) => setProfile(data))
  }, [userId])

  const user: User | null =
    session && profile?.id === session.user.id
      ? { name: profile.name, email: session.user.email ?? '', role: profile.role }
      : null

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return authErrorMessage(error)
  }

  const signUp = async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
    return authErrorMessage(error)
  }

  const signOut = () => supabase.auth.signOut()

  return { user, loading: session === undefined || (session !== null && !user), signIn, signUp, signOut }
}
