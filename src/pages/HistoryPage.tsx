import { useState } from 'react'
import { IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react'
import SensorPage from '../components/SensorPage'
import TrackMap from '../components/TrackMap'
import ValueItem from '../components/ValueItem'
import { useFilesystem } from '../hooks/useFilesystem'
import { formatDistance, formatDuration } from '../utils/format'
import { pathLengthInMeters } from '../utils/geo'
import { savedDays, summarizeDay, trackFileName, type Session } from '../utils/tracks'

function HistoryPage() {
  const { files, content, error, readFile } = useFilesystem()
  const [selectedDay, setSelectedDay] = useState('')
  const days = savedDays(files.map(file => file.name))
  const sessions: Session[] = selectedDay && content ? JSON.parse(content) : []
  const summary = summarizeDay(sessions)
  const firstPoint = sessions.find(session => session.points.length > 0)?.points[0]

  const selectDay = (day: string) => {
    setSelectedDay(day)
    readFile(trackFileName(day))
  }

  return (
    <SensorPage title="Historial" error={error}>
      {days.length === 0 && <p>Todavía no hay recorridos guardados. Inicia el rastreo en la página Mapa.</p>}
      <IonList>
        {days.map(day => (
          <IonItem key={day} button detail color={day === selectedDay ? 'light' : undefined} onClick={() => selectDay(day)}>
            <IonLabel>{day}</IonLabel>
          </IonItem>
        ))}
      </IonList>

      {firstPoint && (
        <>
          <IonListHeader>
            <IonLabel>Recorrido del {selectedDay}</IonLabel>
          </IonListHeader>
          <TrackMap center={firstPoint} paths={sessions.map(session => session.points)} />
          <IonList>
            <ValueItem label="Sesiones" value={String(sessions.length)} />
            <ValueItem label="Distancia" value={formatDistance(summary.distance)} />
            <ValueItem label="Tiempo en movimiento" value={formatDuration(summary.durationMs)} />
            <ValueItem label="Puntos" value={String(summary.points)} />
            {sessions.map(session => (
              <ValueItem
                key={session.startedAt}
                label={`Sesión de las ${new Date(session.startedAt).toLocaleTimeString()}`}
                value={formatDistance(pathLengthInMeters(session.points))}
              />
            ))}
          </IonList>
        </>
      )}
    </SensorPage>
  )
}

export default HistoryPage
