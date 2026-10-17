import { useCallback, useEffect, useState } from 'react'
import { Directory, Encoding, Filesystem, type FileInfo } from '@capacitor/filesystem'
import { usePluginCall } from './usePluginCall'

const DIRECTORY = Directory.Documents

export function useFilesystem() {
  const [files, setFiles] = useState<FileInfo[]>([])
  const [content, setContent] = useState('')
  const { error, run } = usePluginCall()

  const loadFiles = useCallback(async () => {
    await Filesystem.requestPermissions()
    const result = await Filesystem.readdir({ path: '', directory: DIRECTORY })
    setFiles(result.files.filter(file => file.type === 'file'))
  }, [])

  useEffect(() => {
    run(loadFiles)
  }, [run, loadFiles])

  const writeJson = (path: string, data: unknown) => run(async () => {
    await Filesystem.writeFile({
      path,
      data: JSON.stringify(data, null, 2),
      directory: DIRECTORY,
      encoding: Encoding.UTF8,
    })
    await loadFiles()
  })

  const readFile = (path: string) => run(async () => {
    const result = await Filesystem.readFile({ path, directory: DIRECTORY, encoding: Encoding.UTF8 })
    setContent(String(result.data))
  })

  const deleteFile = (path: string) => run(async () => {
    await Filesystem.deleteFile({ path, directory: DIRECTORY })
    setContent('')
    await loadFiles()
  })

  return { files, content, error, writeJson, readFile, deleteFile }
}
