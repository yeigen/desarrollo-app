import { useState, type FormEvent } from 'react'
import { IonButton, IonInput } from '@ionic/react'
import { Mail } from 'lucide-react'
import Avatar from '../shared/Avatar'
import SectionLabel from '../shared/SectionLabel'
import Sheet from '../shared/Sheet'
import { nameFromEmail } from '../../helpers/format'
import { isValidEmail } from '../../helpers/validation'
import styles from './ShareSheet.module.scss'

interface ShareSheetProps {
  isOpen: boolean
  owner: string
  invited: string[]
  onInvite: (email: string) => void
  onClose: () => void
}

function ShareSheet({ isOpen, owner, invited, onInvite, onClose }: ShareSheetProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const invite = (event: FormEvent) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError('Escribe un correo válido.')
      return
    }
    onInvite(email.trim().toLowerCase())
    setEmail('')
    setError('')
  }

  return (
    <Sheet isOpen={isOpen} title="Compartir presupuesto" onClose={onClose}>
      <form className={styles.form} onSubmit={invite} noValidate>
        <IonInput
          aria-label="Correo de la persona"
          className={error ? 'ion-invalid ion-touched' : undefined}
          fill="outline"
          type="email"
          autocomplete="email"
          placeholder="Correo de la persona"
          value={email}
          errorText={error}
          onIonInput={(event) => setEmail(event.detail.value ?? '')}
        >
          <span slot="start" className={styles.mailIcon}>
            <Mail size={16} />
          </span>
        </IonInput>
        <IonButton type="submit">Invitar</IonButton>
      </form>

      <SectionLabel>Quién tiene acceso</SectionLabel>
      <ul className={styles.people}>
        <li className={styles.person}>
          <Avatar name={owner} />
          <div className={styles.info}>
            <p className={styles.name}>{owner} (tú)</p>
            <p className={styles.detail}>Es tu presupuesto</p>
          </div>
        </li>
        {invited.map((person) => (
          <li key={person} className={styles.person}>
            <Avatar name={nameFromEmail(person)} />
            <div className={styles.info}>
              <p className={styles.name}>{nameFromEmail(person)}</p>
              <p className={styles.detail}>{person}</p>
            </div>
            <span className={styles.detail}>Invitación enviada</span>
          </li>
        ))}
      </ul>
    </Sheet>
  )
}

export default ShareSheet
