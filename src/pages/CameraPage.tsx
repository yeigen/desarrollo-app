import { IonButton, IonIcon, IonImg } from '@ionic/react'
import { cameraOutline, imagesOutline } from 'ionicons/icons'
import SensorPage from '../components/SensorPage'
import { useCamera } from '../hooks/useCamera'

function CameraPage() {
  const { photo, error, takePhoto, chooseFromGallery } = useCamera()

  return (
    <SensorPage title="Cámara" error={error}>
      <IonButton expand="block" onClick={takePhoto}>
        <IonIcon slot="start" icon={cameraOutline} />
        Tomar foto
      </IonButton>
      <IonButton expand="block" fill="outline" onClick={chooseFromGallery}>
        <IonIcon slot="start" icon={imagesOutline} />
        Elegir de la galería
      </IonButton>
      {photo ? (
        <IonImg className="ion-margin-top" src={photo} alt="Foto elegida" />
      ) : (
        <p>Todavía no hay foto.</p>
      )}
    </SensorPage>
  )
}

export default CameraPage
