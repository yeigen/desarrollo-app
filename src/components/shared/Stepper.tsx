import { IonButton } from '@ionic/react'
import { Minus, Plus } from 'lucide-react'
import { MAX_QUANTITY } from '../../helpers/budget'
import styles from './Stepper.module.scss'

interface StepperProps {
  quantity: number
  disabled?: boolean
  onChange: (quantity: number) => void
}

function Stepper({ quantity, disabled, onChange }: StepperProps) {
  return (
    <div className={styles.stepper}>
      <IonButton fill="clear" className={styles.button} aria-label="Quitar uno" disabled={disabled} onClick={() => onChange(quantity - 1)}>
        <Minus size={16} />
      </IonButton>
      <span className={styles.quantity}>{quantity}</span>
      <IonButton fill="clear" className={styles.button} aria-label="Agregar uno" disabled={disabled || quantity >= MAX_QUANTITY} onClick={() => onChange(quantity + 1)}>
        <Plus size={16} />
      </IonButton>
    </div>
  )
}

export default Stepper
