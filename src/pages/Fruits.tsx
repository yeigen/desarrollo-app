import { useCallback, useState } from 'react'
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
} from '@ionic/react'
import { createOutline, trashOutline } from 'ionicons/icons'
import FruitForm from '../components/FruitForm'
import NetworkStatus from '../components/NetworkStatus'
import TabHeader from '../components/TabHeader'
import { localDb } from '../db/localDb'
import { useConfirmDelete } from '../hooks/useConfirmDelete'
import { useDexie } from '../hooks/useDexie'
import type { Fruit } from '../types'
import { matchesSearch } from '../utils/matchesSearch'

function Fruits() {
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Fruit | null>(null)
  const confirmDelete = useConfirmDelete()
  const filterBySearch = useCallback((fruit: Fruit) => matchesSearch(fruit.name, search), [search])
  const { results, isPending, addItem, updateItem, removeItem } = useDexie(localDb.fruits, filterBySearch)

  const handleSave = (name: string) => {
    if (editing) updateItem(editing.id, { name })
    else addItem({ name })
    setEditing(null)
  }

  return (
    <IonPage>
      <TabHeader title="Frutas" />
      <IonContent>
        <NetworkStatus />
        <p className="ion-padding-horizontal">Las frutas se guardan en este dispositivo y funcionan sin conexión.</p>
        <FruitForm
          key={editing?.id ?? 'new'}
          initialName={editing?.name ?? ''}
          submitLabel={editing ? 'Guardar cambios' : 'Agregar fruta'}
          onSave={handleSave}
          onCancel={editing ? () => setEditing(null) : undefined}
        />
        <IonSearchbar
          placeholder="Buscar fruta"
          value={search}
          onIonInput={e => setSearch(e.detail.value ?? '')}
        />
        {isPending && (
          <div className="ion-padding ion-text-center">
            <IonSpinner aria-label="Cargando frutas" />
          </div>
        )}
        {!isPending && results.length === 0 && (
          <p className="ion-padding ion-text-center">
            {search ? 'Ninguna fruta coincide con la búsqueda.' : 'No hay frutas todavía.'}
          </p>
        )}
        <IonList inset>
          {results.map(fruit => (
            <IonItem key={fruit.id}>
              <IonLabel>{fruit.name}</IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                aria-label={`Editar ${fruit.name}`}
                onClick={() => setEditing(fruit)}
              >
                <IonIcon slot="icon-only" icon={createOutline} />
              </IonButton>
              <IonButton
                slot="end"
                fill="clear"
                color="danger"
                aria-label={`Eliminar ${fruit.name}`}
                onClick={() => confirmDelete(fruit.name, 'Eliminar fruta', () => removeItem(fruit.id))}
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

export default Fruits
