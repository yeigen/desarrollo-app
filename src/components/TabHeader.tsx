import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import { useAuth } from '../hooks/useAuth'

interface TabHeaderProps {
  title: string
}

function TabHeader({ title }: TabHeaderProps) {
  const { logout } = useAuth()

  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={logout}>Salir</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default TabHeader
