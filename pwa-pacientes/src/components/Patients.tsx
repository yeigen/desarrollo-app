import { useState } from 'react'
import { usePatients } from '../hooks/usePatients'
import { filterPatients } from '../utils/search'
import PatientForm from './PatientForm'
import PatientList from './PatientList'
import PatientSearch from './PatientSearch'

function Patients() {
  const { patients, addPatient } = usePatients()
  const [query, setQuery] = useState('')

  const filteredPatients = filterPatients(patients, query)
  const emptyMessage =
    patients.length === 0
      ? 'No hay pacientes registrados.'
      : 'No se encontraron pacientes para la búsqueda.'

  return (
    <section>
      <h2>Pacientes</h2>
      <PatientForm patients={patients} onSubmit={addPatient} />
      <PatientSearch value={query} onChange={setQuery} />
      <PatientList patients={filteredPatients} emptyMessage={emptyMessage} />
    </section>
  )
}

export default Patients
