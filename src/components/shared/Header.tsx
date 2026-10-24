import type { ReactNode } from 'react'
import { IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import styles from './Header.module.scss'

interface HeaderProps {
  title: string
  end?: ReactNode
}

function Header({ title, end }: HeaderProps) {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className={styles.toolbar}>
        <IonTitle className={styles.title}>{title}</IonTitle>
        {end && <IonButtons slot="end">{end}</IonButtons>}
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
