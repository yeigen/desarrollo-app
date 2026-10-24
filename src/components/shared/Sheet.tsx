import type { ReactNode } from 'react'
import { IonButton, IonModal } from '@ionic/react'
import { X } from 'lucide-react'
import styles from './Sheet.module.scss'

interface SheetProps {
  isOpen: boolean
  title: string
  onClose: () => void
  onWillPresent?: () => void
  footer?: ReactNode
  children: ReactNode
}

function Sheet({ isOpen, title, onClose, onWillPresent, footer, children }: SheetProps) {
  return (
    <IonModal
      className={styles.sheet}
      isOpen={isOpen}
      breakpoints={[0, 1]}
      initialBreakpoint={1}
      onWillPresent={onWillPresent}
      onDidDismiss={onClose}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <IonButton fill="clear" color="medium" aria-label="Cerrar" onClick={onClose}>
          <X size={20} />
        </IonButton>
      </div>
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </IonModal>
  )
}

export default Sheet
