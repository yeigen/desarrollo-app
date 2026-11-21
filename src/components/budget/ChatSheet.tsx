import { useEffect, useRef, useState, type FormEvent } from 'react'
import { IonButton, IonTextarea } from '@ionic/react'
import { Send } from 'lucide-react'
import Avatar from '../shared/Avatar'
import Sheet from '../shared/Sheet'
import Warning from '../shared/Warning'
import type { Person } from '../../context/BudgetContext'
import { MAX_MESSAGE_LENGTH, validateMessage } from '../../helpers/chat'
import { firstName, formatMessageTime } from '../../helpers/format'
import { useAuth } from '../../hooks/useAuth'
import { useBudgetChat } from '../../hooks/useBudgetChat'
import { useNetwork } from '../../hooks/useNetwork'
import styles from './ChatSheet.module.scss'

interface ChatSheetProps {
  isOpen: boolean
  ownerId: string
  people: Person[]
  onClose: () => void
}

function ChatSheet({ isOpen, ownerId, people, onClose }: ChatSheetProps) {
  const { user } = useAuth()
  const connected = useNetwork()
  const { messages, loading, send } = useBudgetChat(ownerId, user?.id ?? '', isOpen)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const frame = requestAnimationFrame(() => endRef.current?.scrollIntoView({ block: 'end' }))
    return () => cancelAnimationFrame(frame)
  }, [isOpen, messages])

  useEffect(() => {
    if (isOpen) return
    setDraft('')
    setError('')
  }, [isOpen])

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (!connected) {
      setError('Sin conexión. No puedes enviar mensajes ahora.')
      return
    }

    const { body, error: validation } = validateMessage(draft)
    if (validation) {
      setError(validation)
      return
    }

    setError('')
    setSending(true)
    const message = await send(body)
    setSending(false)

    if (message) {
      setError(message)
      return
    }

    setDraft('')
  }

  const personName = (id: string) => people.find((person) => person.id === id)?.name ?? 'Alguien'

  return (
    <Sheet
      isOpen={isOpen}
      title="Chat del presupuesto"
      onClose={onClose}
      onWillPresent={() => endRef.current?.scrollIntoView({ block: 'end' })}
      footer={
        <form className={styles.composer} onSubmit={submit}>
          <IonTextarea
            className={styles.input}
            aria-label="Mensaje"
            autoGrow
            rows={1}
            maxlength={MAX_MESSAGE_LENGTH}
            placeholder={connected ? 'Escribe un mensaje' : 'Sin conexión'}
            value={draft}
            disabled={!connected || sending}
            onIonInput={(event) => {
              setDraft(event.detail.value ?? '')
              if (error) setError('')
            }}
          />
          <IonButton
            className={styles.send}
            type="submit"
            aria-label="Enviar"
            disabled={!connected || sending || !draft.trim()}
          >
            <Send size={18} />
          </IonButton>
        </form>
      }
    >
      {!connected && (
        <div className={styles.notice}>
          <Warning>Sin conexión. Puedes leer los últimos mensajes, pero no enviar.</Warning>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}

      {loading && messages.length === 0 ? (
        <p className={styles.status}>Cargando mensajes...</p>
      ) : messages.length === 0 ? (
        <p className={styles.status}>Aún no hay mensajes. Escribe el primero.</p>
      ) : (
        <div className={styles.messages}>
          {messages.map((message) => {
            const mine = message.senderId === user?.id
            const name = personName(message.senderId)
            return (
              <div key={message.id} className={`${styles.message} ${mine ? styles.mine : ''}`}>
                {!mine && <Avatar name={name} />}
                <div className={styles.bubble}>
                  {!mine && <p className={styles.sender}>{firstName(name)}</p>}
                  <p className={styles.body}>{message.body}</p>
                  <time className={styles.time} dateTime={message.createdAt}>
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            )
          })}
          <div ref={endRef} />
        </div>
      )}
    </Sheet>
  )
}

export default ChatSheet
