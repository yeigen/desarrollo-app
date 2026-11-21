import { useState } from 'react'
import { Camera } from '@capacitor/camera'
import { usePluginCall } from './usePluginCall'

const PHOTO_QUALITY = 90

export function useCamera() {
  const [photo, setPhoto] = useState('')
  const { error, run } = usePluginCall()

  const takePhoto = () => run(async () => {
    const result = await Camera.takePhoto({ quality: PHOTO_QUALITY, webUseInput: true })
    setPhoto(result.webPath ?? '')
  })

  return { photo, error, takePhoto }
}
