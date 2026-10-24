import { useEffect, useState } from 'react'
import { Network } from '@capacitor/network'

export function useNetwork() {
  const [connected, setConnected] = useState(true)

  useEffect(() => {
    Network.getStatus().then((status) => setConnected(status.connected))
    const listener = Network.addListener('networkStatusChange', (status) => setConnected(status.connected))
    return () => {
      listener.then((handle) => handle.remove())
    }
  }, [])

  return connected
}
