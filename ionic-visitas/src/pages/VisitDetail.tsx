import { useParams } from 'react-router-dom'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {
  arrowForwardOutline,
  callOutline,
  checkmarkDoneOutline,
  documentTextOutline,
  locationOutline,
  personOutline,
  timeOutline,
} from 'ionicons/icons'
import type { Patient } from '../data/patients'
import { nextVisitStatus, VISIT_STATUS_LABELS, type Visit } from '../data/visits'
import { findPatient, patientFullName } from '../utils/patients'
import VisitStatusBadge from '../components/VisitStatusBadge'

interface VisitDetailProps {
  visits: Visit[]
  patients: Patient[]
  onAdvanceStatus: (id: string) => void
}

function VisitDetail({ visits, patients, onAdvanceStatus }: VisitDetailProps) {
  const { id } = useParams<{ id: string }>()
  const visit = visits.find((candidate) => candidate.id === id)
  const patient = visit ? findPatient(patients, visit.patientId) : undefined
  const nextStatus = visit ? nextVisitStatus(visit.status) : null

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/visitas" text="Visitas" />
          </IonButtons>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!visit ? (
          <IonText color="medium">
            <p>La visita no existe.</p>
          </IonText>
        ) : (
          <>
            <IonList>
              <IonItem>
                <IonIcon slot="start" icon={personOutline} />
                <IonLabel>
                  <h2>Paciente</h2>
                  <p>{patientFullName(patient)}</p>
                </IonLabel>
              </IonItem>
              {patient && (
                <IonItem>
                  <IonIcon slot="start" icon={callOutline} />
                  <IonLabel>
                    <h2>Teléfono</h2>
                    <p>{patient.phone}</p>
                  </IonLabel>
                </IonItem>
              )}
              <IonItem>
                <IonIcon slot="start" icon={timeOutline} />
                <IonLabel>
                  <h2>Hora</h2>
                  <p>{visit.time}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={locationOutline} />
                <IonLabel>
                  <h2>Dirección</h2>
                  <p>{visit.address}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon slot="start" icon={documentTextOutline} />
                <IonLabel>
                  <h2>Motivo</h2>
                  <p>{visit.reason}</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Estado</IonLabel>
                <VisitStatusBadge status={visit.status} />
              </IonItem>
            </IonList>

            {nextStatus ? (
              <IonButton
                className="ion-margin-top"
                expand="block"
                onClick={() => onAdvanceStatus(visit.id)}
              >
                <IonIcon
                  slot="start"
                  icon={nextStatus === 'finalizada' ? checkmarkDoneOutline : arrowForwardOutline}
                />
                Marcar como {VISIT_STATUS_LABELS[nextStatus].toLowerCase()}
              </IonButton>
            ) : (
              <IonNote className="ion-margin-top" style={{ display: 'block' }}>
                Esta visita ya fue finalizada.
              </IonNote>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  )
}

export default VisitDetail
