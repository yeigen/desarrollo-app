import { IonBadge } from '@ionic/react'
import { VISIT_STATUS_LABELS, type VisitStatus } from '../data/visits'

const STATUS_COLORS: Record<VisitStatus, string> = {
  pendiente: 'warning',
  en_camino: 'primary',
  finalizada: 'success',
}

interface VisitStatusBadgeProps {
  status: VisitStatus
}

function VisitStatusBadge({ status }: VisitStatusBadgeProps) {
  return <IonBadge color={STATUS_COLORS[status]}>{VISIT_STATUS_LABELS[status]}</IonBadge>
}

export default VisitStatusBadge
