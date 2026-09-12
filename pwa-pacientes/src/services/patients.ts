import type { Patient, PatientInput } from '../data/patients'

const PATIENTS_KEY = 'mediclinic.patients'

export function loadPatients(): Patient[] {
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

export function createPatient(input: PatientInput): Patient {
  return { id: crypto.randomUUID(), ...input }
}
