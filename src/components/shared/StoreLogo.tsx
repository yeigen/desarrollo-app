import { storeLogo } from '../../helpers/stores'
import styles from './StoreLogo.module.scss'

const MAX_WIDTH_RATIO = 2

interface StoreLogoProps {
  store: string
  size?: number
  column?: boolean
}

function StoreLogo({ store, size = 24, column = false }: StoreLogoProps) {
  const logo = (
    <img
      className={styles.logo}
      src={storeLogo(store)}
      alt=""
      aria-hidden="true"
      style={{ height: size, maxWidth: size * MAX_WIDTH_RATIO }}
    />
  )

  return column ? <span className={styles.column} style={{ width: size * MAX_WIDTH_RATIO }}>{logo}</span> : logo
}

export default StoreLogo
