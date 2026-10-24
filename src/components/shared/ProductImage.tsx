import { ShoppingBasket } from 'lucide-react'
import styles from './ProductImage.module.scss'

const ICON_SIZE_RATIO = 0.45

interface ProductImageProps {
  image: string | null
  size: number
}

function ProductImage({ image, size }: ProductImageProps) {
  return (
    <span className={styles.frame} style={{ width: size, height: size }}>
      {image ? <img src={image} alt="" loading="lazy" /> : <ShoppingBasket size={size * ICON_SIZE_RATIO} />}
    </span>
  )
}

export default ProductImage
