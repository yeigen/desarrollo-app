import { IonItem, IonLabel, IonNote } from '@ionic/react'

interface ValueItemProps {
  label: string
  value: string
}

function ValueItem({ label, value }: ValueItemProps) {
  return (
    <IonItem>
      <IonLabel>{label}</IonLabel>
      <IonNote slot="end">{value}</IonNote>
    </IonItem>
  )
}

export default ValueItem
