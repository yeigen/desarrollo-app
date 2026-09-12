import { usePatients } from '../hooks/usePatients'
import PatientList from './PatientList'

function Patients() {
  const { patients } = usePatients()

  return (
    <section>
      <h2>Pacientes</h2>
      <PatientList patients={patients} />
    </section>
  )
}

export default Patients
