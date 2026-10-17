import { useState } from 'react'
import { Camera, MediaTypeSelection } from '@capacitor/camera'
import { usePluginCall } from './usePluginCall'

const PHOTO_QUALITY = 90

export function useCamera() {
  const [photo, setPhoto] = useState('')
  const { error, run } = usePluginCall()

  const takePhoto = () => run(async () => {
    const result = await Camera.takePhoto({ quality: PHOTO_QUALITY })
    setPhoto(result.webPath ?? '')
  })

  const chooseFromGallery = () => run(async () => {
    const { results } = await Camera.chooseFromGallery({ mediaType: MediaTypeSelection.Photo, limit: 1 })
    setPhoto(results[0]?.webPath ?? '')
  })

  return { photo, error, takePhoto, chooseFromGallery }
}
