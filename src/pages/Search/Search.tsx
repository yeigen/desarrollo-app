import { useState } from 'react'
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import GifGrid from '../../components/GifGrid/GifGrid'
import { useGifSearch } from '../../hooks/useGifSearch'
import styles from './Search.module.scss'

function Search() {
  const [term, setTerm] = useState('')
  const { query, gifs, loading, error, hasMore, loadMore } = useGifSearch(term)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscador de GIFs</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            value={term}
            placeholder="Busca un GIF"
            onIonInput={event => setTerm(event.detail.value ?? '')}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!query && <p className={styles.message}>Escribe algo para buscar GIFs.</p>}
        {error && (
          <IonText color="danger">
            <p role="alert" className={styles.error}>No se pudieron cargar los GIFs: {error}</p>
          </IonText>
        )}
        {query && !loading && !error && gifs.length === 0 && (
          <p className={styles.message}>No hay GIFs para "{query}".</p>
        )}
        <GifGrid gifs={gifs} />
        {loading && gifs.length === 0 && (
          <div className={styles.message}>
            <IonSpinner aria-label="Cargando GIFs" />
          </div>
        )}
        <IonInfiniteScroll
          disabled={!hasMore || Boolean(error)}
          onIonInfinite={async event => {
            await loadMore()
            await event.target.complete()
          }}
        >
          <IonInfiniteScrollContent loadingText="Cargando más GIFs" />
        </IonInfiniteScroll>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <p className={styles.attribution}>Powered by GIPHY</p>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default Search
