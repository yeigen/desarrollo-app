import { useEffect, useState } from 'react'
import { onValue, push, ref, remove, serverTimestamp, update } from 'firebase/database'
import { database } from '../firebase/config'

type Stored<T> = T & { createdAt: number }

export function snapshotToList<T>(value: Record<string, Stored<T>> | null) {
  return Object.entries(value ?? {})
    .map(([id, item]) => ({ ...item, id }))
    .sort((first, second) => first.createdAt - second.createdAt)
}

export function useRealTimeCollection<T extends object>(path: string) {
  const [results, setResults] = useState<(Stored<T> & { id: string })[]>([])
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => onValue(
    ref(database, path),
    snapshot => {
      setResults(snapshotToList<T>(snapshot.val()))
      setIsPending(false)
    },
    listenError => {
      setError(listenError.message)
      setIsPending(false)
    },
  ), [path])

  const addItem = (data: T) => push(ref(database, path), { ...data, createdAt: serverTimestamp() })

  const updateItem = (id: string, changes: Partial<T>) => update(ref(database, `${path}/${id}`), changes)

  const removeItem = (id: string) => remove(ref(database, `${path}/${id}`))

  return { results, isPending, error, addItem, updateItem, removeItem }
}
