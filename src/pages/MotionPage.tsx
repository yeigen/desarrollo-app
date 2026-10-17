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

const NO_READINGS = { label: 'Sin lecturas', color: 'medium' }

const formatAcceleration = (value?: number) => (value === undefined ? '-' : `${value.toFixed(DECIMALS)} m/s²`)

function MotionPage() {
  const { acceleration, motion, isListening, start, stop } = useAccelerometer()
  const motionState = motion ? MOTION_STATES[motion.state] : NO_READINGS

  return (
    <SensorPage title="Movimiento">
      <p>El movimiento es cuánto se aleja la aceleración medida de la gravedad (9.81 m/s²).</p>
      <IonButton expand="block" onClick={isListening ? stop : start}>
        {isListening ? 'Detener acelerómetro' : 'Iniciar acelerómetro'}
      </IonButton>
      <IonText color={motionState.color}>
        <h2 className="ion-text-center">{motionState.label}</h2>
      </IonText>
      <IonList>
        <ValueItem label="Eje X" value={formatAcceleration(acceleration?.x)} />
        <ValueItem label="Eje Y" value={formatAcceleration(acceleration?.y)} />
        <ValueItem label="Eje Z" value={formatAcceleration(acceleration?.z)} />
        <ValueItem label="Movimiento" value={formatAcceleration(motion?.magnitude)} />
      </IonList>
    </SensorPage>
  )
}

export default MotionPage
