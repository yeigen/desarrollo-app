import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { personOutline } from 'ionicons/icons'
import type { Patient } from '../data/patients'
import { patientFullName } from '../utils/patients'

interface PatientsProps {
  patients: Patient[]
}

function Patients({ patients }: PatientsProps) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {patients.map((patient) => (
            <IonItem key={patient.id}>
              <IonIcon slot="start" icon={personOutline} />
              <IonLabel>
                <h2>{patientFullName(patient)}</h2>
                <p>CC {patient.documentId}</p>
                <p>Tel. {patient.phone}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Patients
