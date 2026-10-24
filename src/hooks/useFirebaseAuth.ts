import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { authErrorMessage } from '../helpers/auth'
import { emptyProgress } from '../helpers/missions'
import { auth } from '../services/firebase'
import { uploadProgress } from '../services/progress'

const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password).then(() => '', authErrorMessage)

const signUp = (name: string, email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
    await updateProfile(user, { displayName: name })
    await uploadProgress(user.uid, name, emptyProgress())
    return ''
  }, authErrorMessage)

const logout = () => signOut(auth)

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
    setLoading(false)
  }), [])

  return { user, loading, signIn, signUp, logout }
}
