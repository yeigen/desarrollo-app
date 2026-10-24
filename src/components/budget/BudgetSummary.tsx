import Avatar from '../shared/Avatar'
import { formatCount, formatList, formatPrice } from '../../helpers/format'
import styles from './BudgetSummary.module.scss'

interface BudgetSummaryProps {
  total: number
  count: number
  owner: string
  members: string[]
}

function BudgetSummary({ total, count, owner, members }: BudgetSummaryProps) {
  const firstNames = members.map((name) => name.split(' ')[0])

  return (
    <section className={styles.summary}>
      <p className={styles.label}>Total estimado · {formatCount(count, 'producto', 'productos')}</p>
      <p className={styles.total}>{formatPrice(total)}</p>
      {members.length > 0 && (
        <div className={styles.shared}>
          <span className={styles.avatars}>
            {[owner, ...members].map((name) => <Avatar key={name} name={name} />)}
          </span>
          <span className={styles.dot} />
          Compartido con {formatList(firstNames)} · en vivo
        </div>
      )}
    </section>
  )
}

export default BudgetSummary
