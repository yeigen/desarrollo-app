interface PatientSearchProps {
  value: string
  onChange: (value: string) => void
}

function PatientSearch({ value, onChange }: PatientSearchProps) {
  return (
    <div>
      <label htmlFor="search">Buscar</label>
      <input
        id="search"
        type="search"
        placeholder="Nombre, apellido o cédula"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default PatientSearch
