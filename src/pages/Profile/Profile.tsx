import { IonButton, IonContent, IonItem, IonLabel, IonPage, IonToggle, useIonAlert } from '@ionic/react'
import { LogOut, Users } from 'lucide-react'
import Avatar from '../../components/shared/Avatar'
import Header from '../../components/shared/Header'
import SectionLabel from '../../components/shared/SectionLabel'
import { formatCount, formatPrice } from '../../helpers/format'
import { useAuth } from '../../hooks/useAuth'
import { useSettings } from '../../hooks/useSettings'
import { useSharedBudgets } from '../../hooks/useSharedBudgets'
import styles from './Profile.module.scss'

const ROLE_LABELS = { user: 'Usuario', admin: 'Administrador' }

function Profile() {
  const { user, signOut } = useAuth()
  const { vibrate, setVibrate } = useSettings()
  const sharedBudgets = useSharedBudgets(user?.id ?? '')
  const [presentAlert] = useIonAlert()
  const name = user?.name ?? ''

  const confirmSignOut = () =>
    presentAlert({
      header: '¿Cerrar sesión?',
      message: 'Tendrás que volver a entrar para ver tu presupuesto.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Cerrar sesión', role: 'destructive', handler: signOut },
      ],
    })

  return (
    <IonPage>
      <Header title="Perfil" />
      <IonContent>
        <div className={styles.content}>
          <section className={`${styles.card} ${styles.identity}`}>
            <Avatar name={name} size="large" />
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.email}>{user?.email}</p>
            {user && <span className={styles.role}>{ROLE_LABELS[user.role]}</span>}
          </section>

          <section className={`${styles.card} ${styles.shared}`}>
            <SectionLabel>Compartidos conmigo</SectionLabel>
            {sharedBudgets.length === 0 ? (
              <p className={styles.empty}>Todavía nadie ha compartido un presupuesto contigo.</p>
            ) : (
              sharedBudgets.map((budget) => (
                <IonItem
                  key={budget.ownerId}
                  button
                  detail={false}
                  lines="none"
                  routerLink={`/tabs/budget/${budget.ownerId}`}
                  className={styles.sharedBudget}
                >
                  <span slot="start" className={styles.sharedIcon}>
                    <Users size={20} />
                  </span>
                  <IonLabel className={styles.sharedInfo}>
                    <h3>{budget.ownerName}</h3>
                    <p>{formatCount(budget.count, 'producto', 'productos')}</p>
                  </IonLabel>
                  <span slot="end" className={styles.sharedTotal}>{formatPrice(budget.total)}</span>
                </IonItem>
              ))
            )}
          </section>

          <section className={`${styles.card} ${styles.setting}`}>
            <IonToggle checked={vibrate} justify="space-between" onIonChange={(event) => setVibrate(event.detail.checked)}>
              Vibrar al agregar productos
            </IonToggle>
          </section>

          <IonButton fill="outline" expand="block" className={styles.signOut} onClick={confirmSignOut}>
            <LogOut size={16} className={styles.buttonIcon} />
            Cerrar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Profile
