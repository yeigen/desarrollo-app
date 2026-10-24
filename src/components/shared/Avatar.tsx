import { initials } from '../../helpers/format'
import styles from './Avatar.module.scss'

interface AvatarProps {
  name: string
  size?: 'small' | 'large'
}

function Avatar({ name, size = 'small' }: AvatarProps) {
  return (
    <span className={`${styles.avatar} ${styles[size]}`} aria-hidden="true">
      {initials(name)}
    </span>
  )
}

export default Avatar
