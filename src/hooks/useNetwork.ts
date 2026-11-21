import { useEffect, useState } from 'react'
import { Network, type ConnectionStatus } from '@capacitor/network'

export function useNetwork() {
  const [status, setStatus] = useState<ConnectionStatus>({ connected: true, connectionType: 'unknown' })

  useEffect(() => {
    Network.getStatus().then(setStatus)
    const listener = Network.addListener('networkStatusChange', setStatus)
    return () => {
      listener.then(handle => handle.remove())
    }
  }, [])

  return { connected: status.connected, connectionType: status.connectionType, isWifi: status.connectionType === 'wifi' }
}
