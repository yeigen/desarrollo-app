import type { Patient } from '../data/patients'

interface PatientListProps {
  patients: Patient[]
}

function PatientList({ patients }: PatientListProps) {
  if (patients.length === 0) {
    return <p>No hay pacientes registrados.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>CC</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.documentId}</td>
            <td>{patient.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PatientList
