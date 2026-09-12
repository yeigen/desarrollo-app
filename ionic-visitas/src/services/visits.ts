import { createInitialVisits, type Visit } from '../data/visits'
import { todayKey } from '../utils/date'

const VISITS_KEY = 'mediclinic-visitas.visits'

function readVisits(): Visit[] {
  const raw = localStorage.getItem(VISITS_KEY)
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Visit[]) : []
  } catch {
    localStorage.removeItem(VISITS_KEY)
    return []
  }
}

function writeVisits(visits: Visit[]) {
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits))
}

export function loadTodayVisits(): Visit[] {
  const today = todayKey()
  const stored = readVisits()
  const todayVisits = stored.filter((visit) => visit.date === today)
  if (todayVisits.length > 0) return todayVisits

  const seeded = createInitialVisits(today)
  writeVisits([...stored, ...seeded])
  return seeded
}

export function saveTodayVisits(todayVisits: Visit[]) {
  const today = todayKey()
  const otherDays = readVisits().filter((visit) => visit.date !== today)
  writeVisits([...otherDays, ...todayVisits])
}
