import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import type { Patient } from '../data/patients'
import type { Visit } from '../data/visits'
import { formatToday } from '../utils/date'
import { findPatient, patientFullName } from '../utils/patients'
import VisitStatusBadge from '../components/VisitStatusBadge'

interface VisitsProps {
  visits: Visit[]
  patients: Patient[]
}

function Visits({ visits, patients }: VisitsProps) {
  const sortedVisits = [...visits].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonNote className="ion-padding" style={{ display: 'block' }}>
          Hoy, {formatToday()}
        </IonNote>

        <IonList>
          {sortedVisits.map((visit) => (
            <IonItem key={visit.id} routerLink={`/visitas/${visit.id}`} detail>
              <IonLabel>
                <h2>{patientFullName(findPatient(patients, visit.patientId))}</h2>
                <p>
                  {visit.time} - {visit.reason}
                </p>
              </IonLabel>
              <VisitStatusBadge status={visit.status} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Visits
