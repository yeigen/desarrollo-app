import type { FormEvent, ReactNode } from 'react'
import { IonContent, IonPage } from '@ionic/react'
import { TriangleAlert } from 'lucide-react'
import logo from '../../assets/logo.png'
import styles from './AuthLayout.module.scss'

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
            <img src={logo} alt="Comprice" className={styles.logo} />
            <p className={styles.tagline}>Compara el precio de tu mercado en Cali</p>
          </div>
          {error && (
            <div role="alert" className={styles.alert}>
              <TriangleAlert size={16} />
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
