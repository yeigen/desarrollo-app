import type { Patient } from '../data/patients'

interface PatientListProps {
  patients: Patient[]
  emptyMessage: string
}

function PatientList({ patients, emptyMessage }: PatientListProps) {
  if (patients.length === 0) {
    return <p className="empty">{emptyMessage}</p>
  }

  return (
    <div className="table-wrapper">
      <table className="table">
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
    </div>
  )
}

export default PatientList
