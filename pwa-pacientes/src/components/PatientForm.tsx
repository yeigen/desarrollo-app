import { useState, type SubmitEvent } from 'react'
import type { Patient, PatientInput } from '../data/patients'
import { validatePatient, type PatientErrors } from '../utils/validation'
import { UserPlusIcon } from './icons'

interface PatientFormProps {
  patients: Patient[]
  onSubmit: (input: PatientInput) => void
}

interface Field {
  name: keyof PatientInput
  label: string
  type: 'text' | 'tel'
  inputMode?: 'numeric'
}

const FIELDS: Field[] = [
  { name: 'firstName', label: 'Nombre', type: 'text' },
  { name: 'lastName', label: 'Apellido', type: 'text' },
  { name: 'documentId', label: 'Cédula', type: 'text', inputMode: 'numeric' },
  { name: 'phone', label: 'Teléfono', type: 'tel' },
]

const EMPTY_INPUT: PatientInput = {
  firstName: '',
  lastName: '',
  documentId: '',
  phone: '',
}

function PatientForm({ patients, onSubmit }: PatientFormProps) {
  const [values, setValues] = useState<PatientInput>(EMPTY_INPUT)
  const [errors, setErrors] = useState<PatientErrors>({})

  const updateField = (name: keyof PatientInput, value: string) => {
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const input: PatientInput = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      documentId: values.documentId.trim(),
      phone: values.phone.trim(),
    }

    const validationErrors = validatePatient(input, patients)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    onSubmit(input)
    setValues(EMPTY_INPUT)
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h3>Nuevo paciente</h3>

      <div className="form-grid">
        {FIELDS.map((field) => (
          <div className="field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              inputMode={field.inputMode}
              value={values[field.name]}
              onChange={(event) => updateField(field.name, event.target.value)}
            />
            {errors[field.name] && (
              <p className="field-error" role="alert">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          <UserPlusIcon />
          Agregar
        </button>
      </div>
    </form>
  )
}

export default PatientForm
