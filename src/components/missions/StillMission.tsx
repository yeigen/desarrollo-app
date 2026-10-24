import { IonButton } from '@ionic/react'
import { phonePortraitOutline } from 'ionicons/icons'
import MissionCard from './MissionCard'
import { isCompleted, isUnlocked, STILL_MISSION, STILL_SECONDS, WALK_MISSION } from '../../helpers/missions'
import { useProgress } from '../../hooks/useProgress'
import { useStillTimer } from '../../hooks/useStillTimer'

function StillMission() {
  const { progress } = useProgress()
  const { active, remaining, start } = useStillTimer()
  const completed = isCompleted(progress, STILL_MISSION.id)
  const unlocked = isUnlocked(progress, STILL_MISSION.id)

  return (
    <MissionCard mission={STILL_MISSION} icon={phonePortraitOutline} completed={completed}>
      {completed && <p>Te quedaste quieto {STILL_SECONDS} segundos y el celular vibró.</p>}
      {!completed && !unlocked && <p>Se habilita al completar {WALK_MISSION.title}.</p>}
      {!completed && unlocked && active && (
        <p>
          {remaining === null
            ? 'Esperando datos del acelerómetro…'
            : `No te muevas: ${remaining} s. Si te mueves, el conteo vuelve a empezar.`}
        </p>
      )}
      {!completed && unlocked && !active && <IonButton onClick={start}>Empezar</IonButton>}
    </MissionCard>
  )
}

export default StillMission
