import type { FormEvent, ReactNode } from 'react'
import { IonContent, IonIcon, IonPage } from '@ionic/react'
import { alertCircleOutline, trophy } from 'ionicons/icons'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  onSubmit: () => void
  footer: ReactNode
  error?: string
  children: ReactNode
}

function AuthLayout({ onSubmit, footer, error, children }: AuthLayoutProps) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <IonPage>
      <IonContent className={styles.content}>
        <form className={styles.form} onSubmit={submit} noValidate>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <IonIcon icon={trophy} aria-hidden="true" />
            </div>
            <h1 className={styles.title}>Misiones</h1>
            <p className={styles.tagline}>Completa misiones y gana puntos</p>
          </div>
          {error && (
            <div role="alert" className={styles.alert}>
              <IonIcon icon={alertCircleOutline} aria-hidden="true" />
              {error}
            </div>
          )}
          {children}
          <p className={styles.footer}>{footer}</p>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default AuthLayout
