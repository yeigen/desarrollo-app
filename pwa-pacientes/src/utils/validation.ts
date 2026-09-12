import type { Patient, PatientInput } from '../data/patients'

export type PatientErrors = Partial<Record<keyof PatientInput, string>>

const NAME_PATTERN = /^\p{L}+(?: \p{L}+)*$/u
const DOCUMENT_PATTERN = /^\d{6,10}$/
const PHONE_PATTERN = /^\d{7,10}$/

function validateName(value: string, label: string): string | undefined {
  if (!value) return `El ${label} es obligatorio`
  if (value.length < 2) return `El ${label} debe tener al menos 2 letras`
  if (!NAME_PATTERN.test(value)) return `El ${label} solo puede contener letras`
  return undefined
}

export function validatePatient(input: PatientInput, patients: Patient[]): PatientErrors {
  const errors: PatientErrors = {}

  const firstNameError = validateName(input.firstName, 'nombre')
  if (firstNameError) errors.firstName = firstNameError

  const lastNameError = validateName(input.lastName, 'apellido')
  if (lastNameError) errors.lastName = lastNameError

  if (!input.documentId) {
    errors.documentId = 'La cédula es obligatoria'
  } else if (!DOCUMENT_PATTERN.test(input.documentId)) {
    errors.documentId = 'La cédula debe tener entre 6 y 10 dígitos'
  } else if (patients.some((patient) => patient.documentId === input.documentId)) {
    errors.documentId = 'Ya existe un paciente con esta cédula'
  }

  if (input.phone && !PHONE_PATTERN.test(input.phone)) {
    errors.phone = 'El teléfono debe tener entre 7 y 10 dígitos'
  }

  return errors
}
