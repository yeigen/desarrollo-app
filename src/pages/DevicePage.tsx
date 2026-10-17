import { IonButton, IonList } from '@ionic/react'
import SensorPage from '../components/SensorPage'
import ValueItem from '../components/ValueItem'
import { useDevice } from '../hooks/useDevice'

const PERCENT = 100

function DevicePage() {
  const { info, battery, deviceId, error, refresh } = useDevice()
  const batteryLevel = battery?.batteryLevel

  return (
    <SensorPage title="Dispositivo" error={error}>
      <IonList>
        <ValueItem label="Modelo" value={info?.model ?? '-'} />
        <ValueItem label="Fabricante" value={info?.manufacturer ?? '-'} />
        <ValueItem label="Sistema" value={info ? `${info.operatingSystem} ${info.osVersion}` : '-'} />
        <ValueItem label="Plataforma" value={info?.platform ?? '-'} />
        <ValueItem
          label="Batería"
          value={batteryLevel === undefined ? '-' : `${Math.round(batteryLevel * PERCENT)} %`}
        />
        <ValueItem label="Cargando" value={battery?.isCharging ? 'Sí' : 'No'} />
        <ValueItem label="Identificador" value={deviceId || '-'} />
      </IonList>
      <IonButton expand="block" onClick={refresh}>
        Actualizar
      </IonButton>
    </SensorPage>
  )
}

export default DevicePage
