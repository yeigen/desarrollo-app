import { useCallback, useState } from 'react'
import { CapacitorException } from '@capacitor/core'

export function usePluginCall() {
  const [error, setError] = useState('')

  const run = useCallback(async (call: () => Promise<void>) => {
    setError('')
    try {
      await call()
    } catch (callError) {
      if (!(callError instanceof CapacitorException)) throw callError
      setError(callError.message)
    }
  }, [])

  return { error, setError, run }
}
