import { IonButton } from '@ionic/react'
import { Trash } from 'lucide-react'
import ProductImage from '../shared/ProductImage'
import Stepper from '../shared/Stepper'
import type { BudgetItem } from '../../context/BudgetContext'
import { formatPrice } from '../../helpers/format'
import styles from './BudgetItemRow.module.scss'

interface BudgetItemRowProps {
  item: BudgetItem
  onQuantityChange: (quantity: number) => void
}

function BudgetItemRow({ item, onQuantityChange }: BudgetItemRowProps) {
  const { offer, quantity } = item

  return (
    <div className={styles.row}>
      <ProductImage image={offer.image} size={44} />
      <div className={styles.info}>
        <p className={styles.name}>{offer.name}</p>
        <p className={styles.meta}>{[offer.branch, formatPrice(offer.price)].filter(Boolean).join(' · ')}</p>
      </div>
      <Stepper quantity={quantity} onChange={onQuantityChange} />
      <IonButton fill="clear" color="danger" className={styles.remove} aria-label="Eliminar" onClick={() => onQuantityChange(0)}>
        <Trash size={16} />
      </IonButton>
    </div>
  )
}

export default BudgetItemRow
