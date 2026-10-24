import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import styles from './Warning.module.scss'

interface WarningProps {
  children: ReactNode
}

function Warning({ children }: WarningProps) {
  return (
    <div role="status" className={styles.warning}>
      <TriangleAlert size={16} />
      <span>{children}</span>
    </div>
  )
}

export default Warning
