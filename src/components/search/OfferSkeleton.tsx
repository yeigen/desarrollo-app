import { IonSkeletonText } from '@ionic/react'
import styles from './OfferSkeleton.module.scss'

function OfferSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <IonSkeletonText animated className={styles.thumbnail} />
      <div className={styles.lines}>
        <IonSkeletonText animated className={styles.title} />
        <IonSkeletonText animated className={styles.subtitle} />
        <IonSkeletonText animated className={styles.price} />
      </div>
    </div>
  )
}

export default OfferSkeleton
