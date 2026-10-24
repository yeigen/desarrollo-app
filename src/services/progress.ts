import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { firestore } from './firebase'
import type { Progress } from '../helpers/missions'

export const progressCollection = collection(firestore, 'progress')

export const progressDoc = (uid: string) => doc(progressCollection, uid)

export const uploadProgress = (uid: string, name: string, progress: Progress) =>
  setDoc(progressDoc(uid), { name, ...progress, updatedAt: serverTimestamp() })

const localKey = (uid: string) => `misiones.progress.${uid}`

export function readLocalProgress(uid: string): Progress | null {
  const saved = localStorage.getItem(localKey(uid))
  return saved ? JSON.parse(saved) : null
}

export function writeLocalProgress(uid: string, progress: Progress) {
  localStorage.setItem(localKey(uid), JSON.stringify(progress))
}
