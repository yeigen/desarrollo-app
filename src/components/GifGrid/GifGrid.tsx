import type { Gif } from '../../services/giphy'
import GifCard from '../GifCard/GifCard'
import styles from './GifGrid.module.scss'

function GifGrid({ gifs }: { gifs: Gif[] }) {
  return (
    <div className={styles.grid}>
      {gifs.map(gif => <GifCard key={gif.id} gif={gif} />)}
    </div>
  )
}

export default GifGrid
