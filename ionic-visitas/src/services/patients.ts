import { INITIAL_PATIENTS, type Patient } from '../data/patients'

const PATIENTS_KEY = 'mediclinic-visitas.patients'

function readPatients(): Patient[] {
  const raw = localStorage.getItem(PATIENTS_KEY)
  if (!raw) return []

  try {
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as Patient[]) : []
  } catch {
    localStorage.removeItem(PATIENTS_KEY)
    return []
  }
}

export function savePatients(patients: Patient[]) {
  localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients))
}

export function loadPatients(): Patient[] {
  const stored = readPatients()
  if (stored.length > 0) return stored

  const seeded = [...INITIAL_PATIENTS]
  savePatients(seeded)
  return seeded
}
