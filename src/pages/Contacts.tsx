import { useState } from 'react'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
} from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import ContactForm from '../components/ContactForm'
import NetworkStatus from '../components/NetworkStatus'
import TabHeader from '../components/TabHeader'
import { useCollection } from '../hooks/useCollection'
import { useConfirmDelete } from '../hooks/useConfirmDelete'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useNetwork } from '../hooks/useNetwork'
import type { Contact, ContactValues } from '../types'

const EMPTY_CONTACT: ContactValues = { name: '', phone: '' }

function Contacts() {
  const user = useCurrentUser()
  const { isOnline } = useNetwork()
  const confirmDelete = useConfirmDelete()
  const { results, isPending, error, addItem, updateItem, removeItem } = useCollection<ContactValues>(
    `users/${user.uid}/contacts`,
  )
  const [editing, setEditing] = useState<Contact | null>(null)
  const contacts = [...results].sort((first, second) => first.name.localeCompare(second.name))

  const handleSave = (values: ContactValues) => {
    if (editing) updateItem(editing.id, values)
    else addItem(values)
    setEditing(null)
  }

  return (
    <IonPage>
      <TabHeader title="Contactos" />
      <IonContent>
        <NetworkStatus />
        <ContactForm
          key={editing?.id ?? 'new'}
          initialValues={editing ?? EMPTY_CONTACT}
          submitLabel={editing ? 'Guardar cambios' : 'Agregar contacto'}
          disabled={!isOnline}
          onSave={handleSave}
          onCancel={editing ? () => setEditing(null) : undefined}
        />
        {error && (
          <IonText color="danger">
            <p className="ion-padding-horizontal" role="alert">{error}</p>
          </IonText>
        )}
        {isPending && (
          <div className="ion-padding ion-text-center">
            <IonSpinner aria-label="Cargando contactos" />
          </div>
        )}
        {!isPending && contacts.length === 0 && (
          <p className="ion-padding ion-text-center">No hay contactos todavía.</p>
        )}
        <IonList inset>
          {contacts.map(contact => (
            <IonItem key={contact.id}>
              <IonLabel>
                <h2>{contact.name}</h2>
                <p>{contact.phone}</p>
              </IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                disabled={!isOnline}
                aria-label={`Editar ${contact.name}`}
                onClick={() => setEditing(contact)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                disabled={!isOnline}
                aria-label={`Eliminar ${contact.name}`}
                onClick={() => confirmDelete(contact.name, 'Eliminar contacto', () => removeItem(contact.id))}
              >
                <IonIcon slot="icon-only" icon={trashOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Contacts
