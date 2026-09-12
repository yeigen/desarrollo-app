import type { Patient } from '../data/patients'

function normalize(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
}

export function filterPatients(patients: Patient[], query: string): Patient[] {
  const term = normalize(query)
  if (!term) return patients

  return patients.filter((patient) => {
    const fullName = normalize(`${patient.firstName} ${patient.lastName}`)
    return fullName.includes(term) || patient.documentId.includes(term)
  })
}
