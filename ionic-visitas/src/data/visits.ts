export const VISIT_STATUSES = ['pendiente', 'en_camino', 'finalizada'] as const

export type VisitStatus = (typeof VISIT_STATUSES)[number]

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  pendiente: 'Pendiente',
  en_camino: 'En camino',
  finalizada: 'Finalizada',
}

export interface Visit {
  id: string
  patientId: string
  date: string
  time: string
  address: string
  reason: string
  status: VisitStatus
}

export function nextVisitStatus(status: VisitStatus): VisitStatus | null {
  const index = VISIT_STATUSES.indexOf(status)
  return VISIT_STATUSES[index + 1] ?? null
}

export function createInitialVisits(date: string): Visit[] {
  const visits: Omit<Visit, 'id' | 'date'>[] = [
    { patientId: 'p1', time: '08:00', address: 'Calle 45 # 12-30', reason: 'Control de presión arterial', status: 'finalizada' },
    { patientId: 'p2', time: '09:30', address: 'Carrera 7 # 80-15', reason: 'Curación de herida', status: 'en_camino' },
    { patientId: 'p3', time: '11:00', address: 'Avenida 6N # 25-40', reason: 'Control postoperatorio', status: 'pendiente' },
    { patientId: 'p4', time: '13:00', address: 'Calle 10 # 3-22', reason: 'Consulta general', status: 'pendiente' },
    { patientId: 'p5', time: '15:00', address: 'Carrera 15 # 100-05', reason: 'Vacunación', status: 'pendiente' },
    { patientId: 'p6', time: '16:30', address: 'Calle 72 # 9-50', reason: 'Control de diabetes', status: 'pendiente' },
  ]

  return visits.map((visit, index) => ({ ...visit, id: `${date}-${index + 1}`, date }))
}
