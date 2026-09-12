export interface Patient {
  id: string
  firstName: string
  lastName: string
  documentId: string
  phone: string
}

export const INITIAL_PATIENTS: readonly Patient[] = [
  { id: 'p1', firstName: 'Ana', lastName: 'Gómez', documentId: '1002003004', phone: '3001234567' },
  { id: 'p2', firstName: 'Carlos', lastName: 'Rodríguez', documentId: '1012345678', phone: '3109876543' },
  { id: 'p3', firstName: 'María', lastName: 'Fernández', documentId: '79456123', phone: '3155551234' },
  { id: 'p4', firstName: 'Luis', lastName: 'Martínez', documentId: '52123456', phone: '3204567890' },
  { id: 'p5', firstName: 'Sofía', lastName: 'Ramírez', documentId: '1020304050', phone: '3112223344' },
  { id: 'p6', firstName: 'Jorge', lastName: 'Herrera', documentId: '80123456', phone: '3187654321' },
]
