import { useEffect, useRef, useState } from 'react'
import { IonButton, IonIcon, IonImg, IonList, IonText } from '@ionic/react'
import { cameraOutline } from 'ionicons/icons'
import SensorPage from '../components/SensorPage'
import ValueItem from '../components/ValueItem'
import { useCamera } from '../hooks/useCamera'
import { useFilesystem } from '../hooks/useFilesystem'
import { useGeolocation } from '../hooks/useGeolocation'
import { useNetwork } from '../hooks/useNetwork'
import { useOpenCage } from '../hooks/useOpenCage'
import { drawWatermark, watermarkLines } from '../utils/watermark'

const COORDINATE_DECIMALS = 6

function PhotoPage() {
  const { position, error: locationError, getCurrentPosition } = useGeolocation()
  const { photo, error: cameraError, takePhoto } = useCamera()
  const { writeBase64, error: fileError } = useFilesystem()
  const { connected } = useNetwork()
  const { isConfigured, address, error: addressError, lookupAddress } = useOpenCage()
  const [stamped, setStamped] = useState('')
  const [savedAs, setSavedAs] = useState('')
  const stampedPhotoRef = useRef('')
  const latitude = position?.coords.latitude
  const longitude = position?.coords.longitude

  useEffect(() => {
    getCurrentPosition()
  }, [getCurrentPosition])

  useEffect(() => {
    if (latitude === undefined || longitude === undefined || !isConfigured || !connected) return
    lookupAddress({ lat: latitude, lng: longitude })
  }, [latitude, longitude, isConfigured, connected, lookupAddress])

  useEffect(() => {
    if (!photo || latitude === undefined || longitude === undefined || stampedPhotoRef.current === photo) return
    stampedPhotoRef.current = photo
    const lines = watermarkLines({ lat: latitude, lng: longitude }, new Date(), address)
    drawWatermark(photo, lines).then(dataUrl => {
      const fileName = `foto-${Date.now()}.jpg`
      setStamped(dataUrl)
      setSavedAs(fileName)
      writeBase64(fileName, dataUrl.split(',')[1])
    })
  }, [photo, latitude, longitude, address, writeBase64])

  return (
    <SensorPage title="Foto con ubicación" error={locationError || cameraError || fileError}>
      <IonList>
        <ValueItem label="Latitud" value={latitude?.toFixed(COORDINATE_DECIMALS) ?? 'buscando...'} />
        <ValueItem label="Longitud" value={longitude?.toFixed(COORDINATE_DECIMALS) ?? 'buscando...'} />
      </IonList>
      <p>{isConfigured ? address || 'Sin dirección todavía.' : 'Sin key de OpenCage: la marca de agua lleva solo coordenadas y fecha.'}</p>
      {addressError && (
        <IonText color="danger">
          <p role="alert">{addressError}</p>
        </IonText>
      )}
      <IonButton expand="block" disabled={latitude === undefined} onClick={takePhoto}>
        <IonIcon slot="start" icon={cameraOutline} />
        Tomar foto con ubicación
      </IonButton>
      {stamped && (
        <>
          <IonImg className="ion-margin-top" src={stamped} alt="Foto con la ubicación como marca de agua" />
          <p>Guardada en Documentos como {savedAs}.</p>
        </>
      )}
    </SensorPage>
  )
}

export default PhotoPage
