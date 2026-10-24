import type { ReactNode } from 'react'
import styles from './EmptyState.module.scss'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  text: string
  action?: ReactNode
}

function EmptyState({ icon, title, text, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {action}
    </div>
  )
}

export default EmptyState
