import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type DocumentData,
} from 'firebase/firestore'
import { firestore } from '../firebase/config'

export function useCollection<T extends DocumentData>(path: string) {
  const [results, setResults] = useState<(T & { id: string })[]>([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => onSnapshot(
    collection(firestore, path),
    snapshot => {
      setResults(snapshot.docs.map(item => ({ ...(item.data() as T), id: item.id })))
      setIsPending(false)
    },
    listenError => {
      setError(listenError.message)
      setIsPending(false)
    },
  ), [path])

  const addItem = (data: T) => addDoc(collection(firestore, path), { ...data, createdAt: serverTimestamp() })

  const updateItem = (id: string, changes: Partial<T>) => (
    updateDoc<DocumentData, DocumentData>(doc(firestore, path, id), changes)
  )

  const removeItem = (id: string) => deleteDoc(doc(firestore, path, id))

  return { results, isPending, error, addItem, updateItem, removeItem }
}
