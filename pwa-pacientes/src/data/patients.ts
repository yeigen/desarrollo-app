export interface Patient {
  id: string
  firstName: string
  lastName: string
  documentId: string
  phone: string
}

export type PatientInput = Omit<Patient, 'id'>
