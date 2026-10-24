import { useState } from 'react'
import { IonContent, IonPage, IonToggle } from '@ionic/react'
import { ChartColumn, Share2, Users } from 'lucide-react'
import Header from '../../components/shared/Header'
import SectionLabel from '../../components/shared/SectionLabel'
import StoreLogo from '../../components/shared/StoreLogo'
import Warning from '../../components/shared/Warning'
import { formatNumber } from '../../helpers/format'
import { STORES } from '../../helpers/stores'
import { useAdminStats } from '../../hooks/useAdminStats'
import { useStores } from '../../hooks/useStores'
import styles from './Admin.module.scss'

const STAT_TILES = [
  { key: 'users', label: 'Usuarios registrados', icon: Users },
  { key: 'searches_today', label: 'Búsquedas de hoy', icon: ChartColumn },
  { key: 'shared_budgets', label: 'Presupuestos compartidos', icon: Share2 },
] as const

function Admin() {
  const stats = useAdminStats()
  const { isEnabled, setEnabled } = useStores()
  const [notice, setNotice] = useState('')

  const toggle = (store: (typeof STORES)[number], enabled: boolean) => {
    setEnabled(store.id, enabled)
    setNotice(enabled ? '' : `Los usuarios dejarán de ver las ofertas de ${store.name}.`)
  }

  return (
    <IonPage>
      <Header title="Admin" />
      <IonContent>
        <div className={styles.content}>
          <div className={styles.stats}>
            {STAT_TILES.map(({ key, label, icon: Icon }) => (
              <div key={key} className={styles.stat}>
                <Icon size={20} className={styles.statIcon} />
                <p className={styles.statValue}>{stats ? formatNumber(stats[key]) : '—'}</p>
                <p className={styles.statLabel}>{label}</p>
              </div>
            ))}
          </div>

          {notice && <Warning>{notice}</Warning>}

          <section className={styles.stores}>
            <SectionLabel>Tiendas</SectionLabel>
            {STORES.map((store) => {
              const enabled = isEnabled(store.id)
              return (
                <div key={store.id} className={styles.store}>
                  <StoreLogo store={store.id} size={34} column />
                  <div className={styles.storeInfo}>
                    <p className={styles.storeName}>{store.name}</p>
                    <p className={enabled ? styles.active : styles.inactive}>
                      <span className={styles.statusDot} />
                      {enabled ? 'Activa' : 'Desactivada'}
                    </p>
                  </div>
                  <IonToggle checked={enabled} aria-label={`Activar ${store.name}`} onIonChange={(event) => toggle(store, event.detail.checked)} />
                </div>
              )
            })}
          </section>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Admin
