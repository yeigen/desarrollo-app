import type { Gif } from '../../services/giphy'
import styles from './GifCard.module.scss'

function GifCard({ gif }: { gif: Gif }) {
  return (
    <figure className={styles.card}>
      <img src={gif.url} alt={gif.title} width={gif.width} height={gif.height} loading="lazy" />
      {gif.title && <figcaption>{gif.title}</figcaption>}
    </figure>
  )
}

export default GifCard
