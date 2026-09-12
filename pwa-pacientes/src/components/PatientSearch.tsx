import { MagnifyingGlassIcon } from './icons'

interface PatientSearchProps {
  value: string
  onChange: (value: string) => void
}

function PatientSearch({ value, onChange }: PatientSearchProps) {
  return (
    <div className="field">
      <label htmlFor="search">Buscar</label>
      <div className="search">
        <MagnifyingGlassIcon />
        <input
          id="search"
          type="search"
          placeholder="Nombre, apellido o cédula"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}

export default PatientSearch
