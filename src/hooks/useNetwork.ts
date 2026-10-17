import { useEffect, useState } from 'react'
import { Network, type ConnectionStatus, type ConnectionType } from '@capacitor/network'

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(true)
  const [connectionType, setConnectionType] = useState<ConnectionType>('unknown')

  useEffect(() => {
    const updateStatus = (status: ConnectionStatus) => {
      setIsOnline(status.connected)
      setConnectionType(status.connectionType)
    }
    Network.getStatus().then(updateStatus)
    const listener = Network.addListener('networkStatusChange', updateStatus)
    return () => {
      listener.then(handle => handle.remove())
    }
  }, [])

  return { isOnline, connectionType }
}
