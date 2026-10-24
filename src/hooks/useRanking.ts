import { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import type { RankingEntry } from '../helpers/ranking'
import { progressCollection } from '../services/progress'

export function useRanking() {
  const [entries, setEntries] = useState<RankingEntry[] | null>(null)

  useEffect(() => onSnapshot(progressCollection, snapshot => {
    setEntries(snapshot.docs.map(item => {
      const data = item.data({ serverTimestamps: 'estimate' })
      return { uid: item.id, name: data.name, points: data.points, updatedAt: data.updatedAt.toMillis() }
    }))
  }), [])

  return entries
}
