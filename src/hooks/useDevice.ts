import { useCallback, useEffect, useState } from 'react'
import { Device, type BatteryInfo, type DeviceInfo } from '@capacitor/device'
import { usePluginCall } from './usePluginCall'

export function useDevice() {
  const [info, setInfo] = useState<DeviceInfo>()
  const [battery, setBattery] = useState<BatteryInfo>()
  const [deviceId, setDeviceId] = useState('')
  const { error, run } = usePluginCall()

  const refresh = useCallback(() => run(async () => {
    const [deviceInfo, batteryInfo, id] = await Promise.all([
      Device.getInfo(),
      Device.getBatteryInfo(),
      Device.getId(),
    ])
    setInfo(deviceInfo)
    setBattery(batteryInfo)
    setDeviceId(id.identifier)
  }), [run])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { info, battery, deviceId, error, refresh }
}
