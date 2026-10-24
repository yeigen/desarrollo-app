import { useState } from 'react'
import { Camera, type MediaResult } from '@capacitor/camera'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { usePluginCall } from './usePluginCall'
import { useProgress } from './useProgress'
import { PHOTO_MISSION } from '../helpers/missions'

const PHOTO_QUALITY = 80

export function useEvidencePhoto(uid: string) {
  const [photo, setPhoto] = useState<MediaResult | null>(null)
  const { complete } = useProgress()
  const { error, run } = usePluginCall()

  const takePhoto = () => run(async () => {
    setPhoto(await Camera.takePhoto({ quality: PHOTO_QUALITY, webUseInput: true }))
  })

  const savePhoto = (result: MediaResult) => run(async () => {
    const data = result.uri ? (await Filesystem.readFile({ path: result.uri })).data : result.thumbnail!
    await Filesystem.writeFile({ path: `evidencia-${uid}.jpeg`, data, directory: Directory.Data })
    complete(PHOTO_MISSION.id)
  })

  return { photo, error, takePhoto, savePhoto }
}
