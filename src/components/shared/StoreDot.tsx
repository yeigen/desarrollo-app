import { storeName } from '../../helpers/stores'
import styles from './StoreDot.module.scss'

const INITIAL_SIZE_RATIO = 0.45

interface StoreDotProps {
  store: string
  size?: number
}

function StoreDot({ store, size = 24 }: StoreDotProps) {
  return (
    <span
      className={styles.dot}
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * INITIAL_SIZE_RATIO, background: `var(--store-${store}, var(--app-muted-foreground))` }}
    >
      {storeName(store)[0]}
    </span>
  )
}

export default StoreDot
