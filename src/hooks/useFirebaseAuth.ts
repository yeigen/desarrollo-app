import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from '../firebase/config'

const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password)

const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password)

const logout = () => signOut(auth)

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
    setLoading(false)
  }), [])

  return { user, loading, login, register, logout }
}
