import type { ReactNode } from 'react'
import { IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import styles from './Header.module.scss'

interface HeaderProps {
  title: string
  start?: ReactNode
  end?: ReactNode
}

function Header({ title, start, end }: HeaderProps) {
  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className={styles.toolbar}>
        {start && <IonButtons slot="start">{start}</IonButtons>}
        <IonTitle className={styles.title}>{title}</IonTitle>
        {end && <IonButtons slot="end">{end}</IonButtons>}
      </IonToolbar>
    </IonHeader>
  )
}

export default Header
