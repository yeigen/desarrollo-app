import type { Patient } from '../data/patients'

export function findPatient(patients: Patient[], id: string): Patient | undefined {
  return patients.find((patient) => patient.id === id)
}

export function patientFullName(patient: Patient | undefined): string {
  if (!patient) return 'Paciente no registrado'
  return `${patient.firstName} ${patient.lastName}`
}
