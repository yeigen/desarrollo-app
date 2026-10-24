import { useState, type FormEvent } from 'react'
import { IonButton, IonChip, IonContent, IonLabel, IonPage, IonSearchbar, useIonToast } from '@ionic/react'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { Clock, RefreshCw, Search as SearchIcon, SlidersHorizontal, TriangleAlert } from 'lucide-react'
import FiltersSheet from '../../components/search/FiltersSheet'
import OfferCard from '../../components/search/OfferCard'
import OfferSkeleton from '../../components/search/OfferSkeleton'
import EmptyState from '../../components/shared/EmptyState'
import Header from '../../components/shared/Header'
import Sheet from '../../components/shared/Sheet'
import Warning from '../../components/shared/Warning'
import { TAB_BAR_ID } from '../../config'
import { formatList } from '../../helpers/format'
import { offerKey } from '../../helpers/offers'
import { storeName } from '../../helpers/stores'
import { useBudget } from '../../hooks/useBudget'
import { useSearch } from '../../hooks/useSearch'
import { useSettings } from '../../hooks/useSettings'
import { useStores } from '../../hooks/useStores'
import { EMPTY_FILTERS, type Offer } from '../../services/compriceApi'
import styles from './Search.module.scss'

const TOAST_DURATION = 2200

const SKELETON_COUNT = 4

function Search() {
  const { query, filters, result, loading, failed, recent, search, applyFilters, retry } = useSearch()
  const { quantityOf, setQuantity } = useBudget()
  const { vibrate } = useSettings()
  const { isEnabled } = useStores()
  const [presentToast] = useIonToast()
  const [text, setText] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [zoomed, setZoomed] = useState<Offer | null>(null)

  const activeFilters = [
    filters.stores.length > 0,
    filters.unit,
    filters.minPrice || filters.maxPrice,
    filters.minPricePerUnit || filters.maxPricePerUnit,
    filters.sort !== EMPTY_FILTERS.sort,
  ].filter(Boolean).length

  const offers = result?.offers.filter((offer) => isEnabled(offer.store)) ?? []
  const pricesPerUnit = offers.flatMap((offer) => offer.price_per_unit ?? [])
  const bestPricePerUnit = Math.min(...pricesPerUnit)
  const missingStores = result?.stores_without_response.filter(isEnabled).map(storeName) ?? []

  const submit = (event: FormEvent) => {
    event.preventDefault()
    search(text)
  }

  const searchRecent = (item: string) => {
    setText(item)
    search(item)
  }

  const add = (offer: Offer) => {
    setQuantity(offer, quantityOf(offer) + 1)
    if (vibrate) Haptics.impact({ style: ImpactStyle.Light })
    presentToast({
      message: 'Agregado al presupuesto',
      duration: TOAST_DURATION,
      position: 'bottom',
      positionAnchor: TAB_BAR_ID,
      cssClass: styles.toast,
    })
  }

  return (
    <IonPage>
      <Header title="Buscar" />
      <IonContent>
        <div className={styles.controls}>
          <div className={styles.searchRow}>
            <form className={styles.form} onSubmit={submit}>
              <IonSearchbar
                className={styles.searchbar}
                value={text}
                placeholder="Busca un producto"
                enterkeyhint="search"
                onIonInput={(event) => setText(event.detail.value ?? '')}
              />
            </form>
            <div className={styles.filtersWrapper}>
              <IonButton fill="outline" className={styles.filters} aria-label="Filtros" onClick={() => setFiltersOpen(true)}>
                <SlidersHorizontal size={20} />
              </IonButton>
              {activeFilters > 0 && <span className={styles.filtersCount}>{activeFilters}</span>}
            </div>
          </div>
          {recent.length > 0 && (
            <div className={styles.recent}>
              {recent.map((item) => (
                <IonChip key={item} className={styles.recentChip} onClick={() => searchRecent(item)}>
                  <Clock size={14} />
                  <IonLabel>{item}</IonLabel>
                </IonChip>
              ))}
            </div>
          )}
        </div>

        <div className={styles.results}>
          {loading ? (
            Array.from({ length: SKELETON_COUNT }, (_, index) => <OfferSkeleton key={index} />)
          ) : failed ? (
            <EmptyState
              icon={<TriangleAlert size={32} />}
              title="No pudimos cargar las ofertas"
              text="Revisa tu conexión e inténtalo de nuevo."
              action={<IonButton onClick={retry}><RefreshCw size={16} className={styles.buttonIcon} />Reintentar</IonButton>}
            />
          ) : !result ? (
            <EmptyState
              icon={<SearchIcon size={32} />}
              title="Busca un producto"
              text="Escribe qué necesitas y compara su precio en las tiendas de Cali."
            />
          ) : offers.length === 0 ? (
            <EmptyState
              icon={<SearchIcon size={32} />}
              title="Sin resultados"
              text={`No encontramos ofertas para "${query}". Prueba con otra palabra o quita filtros.`}
              action={activeFilters > 0 && <IonButton fill="outline" onClick={() => applyFilters(EMPTY_FILTERS)}>Limpiar filtros</IonButton>}
            />
          ) : (
            <>
              <p className={styles.summary}>
                <strong>{offers.length} ofertas</strong> para {query}
              </p>
              {missingStores.length > 0 && (
                <Warning>
                  {formatList(missingStores)} {missingStores.length === 1 ? 'no respondió' : 'no respondieron'}. Sus ofertas no aparecen.
                </Warning>
              )}
              {offers.map((offer) => (
                <OfferCard
                  key={offerKey(offer)}
                  offer={offer}
                  isBest={offer.price_per_unit === bestPricePerUnit}
                  quantity={quantityOf(offer)}
                  onAdd={() => add(offer)}
                  onQuantityChange={(quantity) => setQuantity(offer, quantity)}
                  onOpenImage={() => setZoomed(offer)}
                />
              ))}
            </>
          )}
        </div>

        <FiltersSheet isOpen={filtersOpen} filters={filters} onApply={applyFilters} onClose={() => setFiltersOpen(false)} />

        <Sheet isOpen={zoomed !== null} title={zoomed?.name ?? ''} onClose={() => setZoomed(null)}>
          {zoomed?.image && (
            <div className={styles.zoomed}>
              <img src={zoomed.image} alt={zoomed.name} />
            </div>
          )}
        </Sheet>
      </IonContent>
    </IonPage>
  )
}

export default Search
