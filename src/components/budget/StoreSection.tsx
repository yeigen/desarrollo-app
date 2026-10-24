import { IonAccordion, IonItem, IonLabel } from '@ionic/react'
import BudgetItemRow from './BudgetItemRow'
import StoreLogo from '../shared/StoreLogo'
import type { BudgetItem } from '../../context/BudgetContext'
import { countUnits, totalPrice } from '../../helpers/budget'
import { formatCount, formatPrice } from '../../helpers/format'
import { offerKey } from '../../helpers/offers'
import { storeName } from '../../helpers/stores'
import type { Offer } from '../../services/compriceApi'
import styles from './StoreSection.module.scss'

interface StoreSectionProps {
  store: string
  items: BudgetItem[]
  onQuantityChange: (offer: Offer, quantity: number) => void
}

function StoreSection({ store, items, onQuantityChange }: StoreSectionProps) {
  const units = countUnits(items)
  const subtotal = totalPrice(items)

  return (
    <IonAccordion value={store} className={styles.section} style={{ borderLeftColor: `var(--store-${store})` }}>
      <IonItem slot="header" lines="none" className={styles.header}>
        <StoreLogo store={store} size={30} column />
        <IonLabel className={styles.name}>
          <h3>{storeName(store)}</h3>
          <p>{formatCount(units, 'unidad', 'unidades')}</p>
        </IonLabel>
        <span slot="end" className={styles.subtotal}>{formatPrice(subtotal)}</span>
      </IonItem>
      <div slot="content" className={styles.content}>
        {items.map((item) => (
          <BudgetItemRow
            key={offerKey(item.offer)}
            item={item}
            onQuantityChange={(quantity) => onQuantityChange(item.offer, quantity)}
          />
        ))}
      </div>
    </IonAccordion>
  )
}

export default StoreSection
