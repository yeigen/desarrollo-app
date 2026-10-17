import type { ReactNode } from 'react'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

interface SensorPageProps {
  title: string
  error?: string
  children: ReactNode
}

function SensorPage({ title, error, children }: SensorPageProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && (
          <IonText color="danger">
            <p role="alert">{error}</p>
          </IonText>
        )}
        {children}
      </IonContent>
    </IonPage>
  )
}

export default SensorPage
