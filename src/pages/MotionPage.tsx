import { IonButton, IonList, IonText } from '@ionic/react'
import SensorPage from '../components/SensorPage'
import ValueItem from '../components/ValueItem'
import { useAccelerometer } from '../hooks/useAccelerometer'

const DECIMALS = 2

const MOTION_STATES = {
  rest: { label: 'En reposo', color: 'medium' },
  moving: { label: 'En movimiento', color: 'warning' },
  shaking: { label: 'Sacudiendo', color: 'danger' },
}

const formatAcceleration = (value: number) => `${value.toFixed(DECIMALS)} m/s²`

function MotionPage() {
  const { acceleration, magnitude, state, isListening, start, stop } = useAccelerometer()
  const motionState = MOTION_STATES[state]

  return (
    <SensorPage title="Movimiento">
      <IonButton expand="block" onClick={isListening ? stop : start}>
        {isListening ? 'Detener acelerómetro' : 'Iniciar acelerómetro'}
      </IonButton>
      <IonText color={motionState.color}>
        <h2 className="ion-text-center">{motionState.label}</h2>
      </IonText>
      <IonList>
        <ValueItem label="Eje X" value={formatAcceleration(acceleration.x)} />
        <ValueItem label="Eje Y" value={formatAcceleration(acceleration.y)} />
        <ValueItem label="Eje Z" value={formatAcceleration(acceleration.z)} />
        <ValueItem label="Magnitud" value={formatAcceleration(magnitude)} />
      </IonList>
    </SensorPage>
  )
}

export default MotionPage
