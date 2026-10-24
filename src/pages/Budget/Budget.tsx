import { useState } from 'react'
import { IonAccordionGroup, IonButton, IonContent, IonPage, useIonAlert } from '@ionic/react'
import { Share2, ShoppingBasket, Trash, TriangleAlert } from 'lucide-react'
import BudgetSummary from '../../components/budget/BudgetSummary'
import ShareSheet from '../../components/budget/ShareSheet'
import StoreSection from '../../components/budget/StoreSection'
import EmptyState from '../../components/shared/EmptyState'
import Header from '../../components/shared/Header'
import { firstName } from '../../helpers/format'
import { STORES } from '../../helpers/stores'
import { useAuth } from '../../hooks/useAuth'
import { useBudget } from '../../hooks/useBudget'
import styles from './Budget.module.scss'

function Budget() {
  const { user } = useAuth()
  const { ownerId, people, items, loading, count, total, setQuantity, clear, invite } = useBudget()
  const [presentAlert] = useIonAlert()
  const [shareOpen, setShareOpen] = useState(false)
  const [collapsed, setCollapsed] = useState<string[]>([])

  const sharedWith = people.filter((person) => person.id !== user?.id).map((person) => firstName(person.name))
  const groups = STORES.map((store) => ({ store: store.id, items: items.filter((item) => item.offer.store === store.id) }))
    .filter((group) => group.items.length > 0)
  const stores = groups.map((group) => group.store)

  const changeExpanded = (expanded: string[]) => setCollapsed(stores.filter((store) => !expanded.includes(store)))

  const confirmClear = () =>
    presentAlert({
      header: '¿Vaciar presupuesto?',
      message: sharedWith.length > 0
        ? 'Se eliminarán todos los productos. Las personas con acceso también lo verán vacío.'
        : 'Se eliminarán todos los productos.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Vaciar', role: 'destructive', handler: clear },
      ],
    })

  return (
    <IonPage>
      <Header
        title="Presupuesto"
        end={
          <IonButton fill="clear" color="primary" aria-label="Compartir" onClick={() => setShareOpen(true)}>
            <Share2 size={20} />
          </IonButton>
        }
      />
      <IonContent>
        {loading ? null : items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBasket size={32} />}
            title="Tu presupuesto está vacío"
            text="Busca productos en la pestaña Buscar y agrega la oferta más barata para empezar a ahorrar."
          />
        ) : (
          <div className={styles.content}>
            <BudgetSummary total={total} count={count} people={people} sharedWith={sharedWith} />
            <IonAccordionGroup
              multiple
              className={styles.sections}
              value={stores.filter((store) => !collapsed.includes(store))}
              onIonChange={(event) => changeExpanded([event.detail.value ?? []].flat())}
            >
              {groups.map((group) => (
                <StoreSection key={group.store} store={group.store} items={group.items} onQuantityChange={setQuantity} />
              ))}
            </IonAccordionGroup>
            <p className={styles.note}>
              <TriangleAlert size={16} />
              Los precios son orientativos: la tienda recalcula envío, servicio y bolsa.
            </p>
            <IonButton fill="clear" color="danger" expand="block" onClick={confirmClear}>
              <Trash size={16} className={styles.buttonIcon} />
              Vaciar presupuesto
            </IonButton>
          </div>
        )}

        <ShareSheet isOpen={shareOpen} ownerId={ownerId} people={people} onInvite={invite} onClose={() => setShareOpen(false)} />
      </IonContent>
    </IonPage>
  )
}

export default Budget
