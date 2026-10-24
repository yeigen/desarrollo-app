import { IonButton, IonProgressBar } from '@ionic/react'
import { walkOutline } from 'ionicons/icons'
import MissionCard from './MissionCard'
import { isCompleted, MIN_DISTANCE_METERS, WALK_MISSION } from '../../helpers/missions'
import { useProgress } from '../../hooks/useProgress'
import { useWalkTracker } from '../../hooks/useWalkTracker'

function WalkMission() {
  const { progress } = useProgress()
  const { tracking, distance, accuracy, maxAccuracy, error, start } = useWalkTracker()
  const completed = isCompleted(progress, WALK_MISSION.id)

  const status = () => {
    if (distance !== null) return `Llevas ${Math.round(distance)} m de ${MIN_DISTANCE_METERS} m.`
    if (accuracy === null) return 'Buscando tu ubicación…'
    return `Esperando una señal GPS de ${maxAccuracy} m o mejor (ahora ${Math.round(accuracy)} m).`
  }

  return (
    <MissionCard mission={WALK_MISSION} icon={walkOutline} completed={completed} error={error}>
      {completed && <p>Te alejaste más de {MIN_DISTANCE_METERS} m de tu posición original.</p>}
      {!completed && tracking && (
        <>
          <IonProgressBar value={Math.min((distance ?? 0) / MIN_DISTANCE_METERS, 1)} />
          <p>{status()}</p>
        </>
      )}
      {!completed && !tracking && <IonButton onClick={start}>Empezar a caminar</IonButton>}
    </MissionCard>
  )
}

export default WalkMission
