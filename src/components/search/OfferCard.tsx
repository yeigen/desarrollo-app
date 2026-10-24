import { IonButton } from '@ionic/react'
import { Plus } from 'lucide-react'
import ProductImage from '../shared/ProductImage'
import Stepper from '../shared/Stepper'
import StoreDot from '../shared/StoreDot'
import { formatPrice } from '../../helpers/format'
import { formatAmount, formatPricePerUnit, formatSeenAt } from '../../helpers/offers'
import { storeName } from '../../helpers/stores'
import type { Offer } from '../../services/compriceApi'
import styles from './OfferCard.module.scss'

interface OfferCardProps {
  offer: Offer
  isBest: boolean
  quantity: number
  onAdd: () => void
  onQuantityChange: (quantity: number) => void
  onOpenImage: () => void
}

function OfferCard({ offer, isBest, quantity, onAdd, onQuantityChange, onOpenImage }: OfferCardProps) {
  const details = [offer.brand, formatAmount(offer)].filter(Boolean).join(' · ')
  const meta = [formatPricePerUnit(offer), formatSeenAt(offer)].filter(Boolean).join(' · ')

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <button type="button" className={styles.thumbnail} aria-label="Ampliar imagen" disabled={!offer.image} onClick={onOpenImage}>
          <ProductImage image={offer.image} size={64} />
        </button>
        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h3 className={styles.name}>{offer.name}</h3>
            {isBest && <span className={styles.best}>Mejor precio</span>}
          </div>
          {details && <p className={styles.details}>{details}</p>}
          <p className={styles.store}>
            <StoreDot store={offer.store} size={18} />
            {[storeName(offer.store), offer.branch].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div>
          <p className={styles.price}>{formatPrice(offer.price)}</p>
          {meta && <p className={styles.meta}>{meta}</p>}
        </div>
        {quantity > 0 ? (
          <Stepper quantity={quantity} onChange={onQuantityChange} />
        ) : (
          <IonButton className={styles.add} onClick={onAdd}>
            <Plus size={16} />
            Agregar
          </IonButton>
        )}
      </div>
    </article>
  )
}

export default OfferCard
