import { useCallback, useEffect, useState } from 'react'
import { Device, type BatteryInfo } from '@capacitor/device'
import { usePluginCall } from './usePluginCall'

export function useDevice() {
  const [battery, setBattery] = useState<BatteryInfo>()
  const { error, run } = usePluginCall()

  const refresh = useCallback(() => run(async () => {
    setBattery(await Device.getBatteryInfo())
  }), [run])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { battery, error, refresh }
}
