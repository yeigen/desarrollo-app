import { IonButton } from '@ionic/react'
import { cameraOutline } from 'ionicons/icons'
import MissionCard from './MissionCard'
import { isCompleted, PHOTO_MISSION } from '../../helpers/missions'
import { useAuth } from '../../hooks/useAuth'
import { useEvidencePhoto } from '../../hooks/useEvidencePhoto'
import { useProgress } from '../../hooks/useProgress'
import styles from './PhotoMission.module.css'

function PhotoMission() {
  const { user } = useAuth()
  const { progress } = useProgress()
  const { photo, error, takePhoto, savePhoto } = useEvidencePhoto(user!.uid)
  const completed = isCompleted(progress, PHOTO_MISSION.id)

  return (
    <MissionCard mission={PHOTO_MISSION} icon={cameraOutline} completed={completed} error={error}>
      {photo && <img src={photo.webPath} alt="Foto de evidencia" className={styles.photo} />}
      {completed ? (
        <p>Evidencia guardada en el dispositivo.</p>
      ) : (
        <div className={styles.actions}>
          <IonButton fill={photo ? 'outline' : 'solid'} onClick={takePhoto}>
            {photo ? 'Tomar otra' : 'Tomar foto'}
          </IonButton>
          {photo && <IonButton onClick={() => savePhoto(photo)}>Guardar evidencia</IonButton>}
        </div>
      )}
    </MissionCard>
  )
}

export default PhotoMission
