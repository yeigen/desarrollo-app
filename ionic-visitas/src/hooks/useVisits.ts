import { useState } from 'react'
import { nextVisitStatus, type Visit } from '../data/visits'
import { loadTodayVisits, saveTodayVisits } from '../services/visits'

export function useVisits() {
  const [visits, setVisits] = useState<Visit[]>(loadTodayVisits)

  const advanceStatus = (id: string) => {
    const updated = visits.map((visit) => {
      if (visit.id !== id) return visit
      const next = nextVisitStatus(visit.status)
      return next ? { ...visit, status: next } : visit
    })

    setVisits(updated)
    saveTodayVisits(updated)
  }

  return { visits, advanceStatus }
}
