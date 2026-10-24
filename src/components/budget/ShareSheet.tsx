import { useState, type FormEvent } from 'react'
import { IonButton, IonInput } from '@ionic/react'
import { Mail } from 'lucide-react'
import Avatar from '../shared/Avatar'
import SectionLabel from '../shared/SectionLabel'
import Sheet from '../shared/Sheet'
import type { Person } from '../../context/BudgetContext'
import { isValidEmail } from '../../helpers/validation'
import styles from './ShareSheet.module.scss'

interface ShareSheetProps {
  isOpen: boolean
  ownerId: string
  people: Person[]
  onInvite: (email: string) => Promise<string>
  onClose: () => void
}

function ShareSheet({ isOpen, ownerId, people, onInvite, onClose }: ShareSheetProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const invite = async (event: FormEvent) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError('Escribe un correo válido.')
      return
    }
    setPending(true)
    const message = await onInvite(email.trim().toLowerCase())
    setPending(false)
    setError(message)
    if (!message) setEmail('')
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
        <IonButton type="submit" disabled={pending}>Invitar</IonButton>
      </form>

      <SectionLabel>Quién tiene acceso</SectionLabel>
      <ul className={styles.people}>
        {people.map((person) => {
          const isOwner = person.id === ownerId
          return (
            <li key={person.id} className={styles.person}>
              <Avatar name={person.name} />
              <div className={styles.info}>
                <p className={styles.name}>{isOwner ? `${person.name} (tú)` : person.name}</p>
                <p className={styles.detail}>{isOwner ? 'Es tu presupuesto' : person.email}</p>
              </div>
              {!isOwner && <span className={styles.detail}>Puede editar</span>}
            </li>
          )
        })}
      </ul>
    </Sheet>
  )
}

export default ShareSheet
