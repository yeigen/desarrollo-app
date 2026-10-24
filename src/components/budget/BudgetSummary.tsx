import Avatar from '../shared/Avatar'
import type { Person } from '../../context/BudgetContext'
import { formatCount, formatList, formatPrice } from '../../helpers/format'
import styles from './BudgetSummary.module.scss'

interface BudgetSummaryProps {
  total: number
  count: number
  people: Person[]
  sharedWith: string[]
}

function BudgetSummary({ total, count, people, sharedWith }: BudgetSummaryProps) {
  return (
    <section className={styles.summary}>
      <p className={styles.label}>Total estimado · {formatCount(count, 'producto', 'productos')}</p>
      <p className={styles.total}>{formatPrice(total)}</p>
      {sharedWith.length > 0 && (
        <div className={styles.shared}>
          <span className={styles.avatars}>
            {people.map((person) => <Avatar key={person.id} name={person.name} />)}
          </span>
          <span className={styles.dot} />
          Compartido con {formatList(sharedWith)} · en vivo
        </div>
      )}
    </section>
  )
}

export default BudgetSummary
