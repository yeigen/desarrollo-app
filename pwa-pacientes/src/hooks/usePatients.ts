import { useState } from 'react'
import type { Patient, PatientInput } from '../data/patients'
import { createPatient, loadPatients, savePatients } from '../services/patients'

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>(loadPatients)

  const addPatient = (input: PatientInput) => {
    const updated = [...patients, createPatient(input)]
    setPatients(updated)
    savePatients(updated)
  }

  return { patients, addPatient }
}
