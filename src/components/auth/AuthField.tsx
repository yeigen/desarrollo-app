import { IonInput, IonInputPasswordToggle } from '@ionic/react'
import styles from './AuthField.module.css'

interface AuthFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'password'
  autocomplete?: 'name' | 'email' | 'current-password' | 'new-password'
  placeholder?: string
  error?: string
}

function AuthField({ label, value, onChange, type = 'text', autocomplete, placeholder, error }: AuthFieldProps) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <IonInput
        aria-label={label}
        className={error ? 'ion-invalid ion-touched' : undefined}
        fill="outline"
        type={type}
        autocomplete={autocomplete}
        placeholder={placeholder}
        value={value}
        errorText={error}
        onIonInput={event => onChange(event.detail.value ?? '')}
      >
        {type === 'password' && <IonInputPasswordToggle slot="end" color="medium" />}
      </IonInput>
    </div>
  )
}

export default AuthField
