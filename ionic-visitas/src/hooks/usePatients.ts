import { useState } from 'react'
import type { Patient } from '../data/patients'
import { loadPatients } from '../services/patients'

export function usePatients() {
  const [patients] = useState<Patient[]>(loadPatients)

  return { patients }
}
