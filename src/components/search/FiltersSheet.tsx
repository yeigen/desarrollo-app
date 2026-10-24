import { useState } from 'react'
import { IonButton, IonChip, IonInput, IonLabel, IonSegment, IonSegmentButton } from '@ionic/react'
import Sheet from '../shared/Sheet'
import StoreDot from '../shared/StoreDot'
import { STORES } from '../../helpers/stores'
import { EMPTY_FILTERS, type SearchFilters, type SortKey, type Unit } from '../../services/compriceApi'
import styles from './FiltersSheet.module.scss'

const UNITS: [Unit, string][] = [['g', 'Gramos'], ['ml', 'Mililitros'], ['un', 'Unidades']]

const SORTS: [SortKey, string][] = [['price_per_unit', 'Precio por unidad'], ['price', 'Precio'], ['name', 'Nombre']]

type RangeField = 'minPrice' | 'maxPrice' | 'minPricePerUnit' | 'maxPricePerUnit'

interface FiltersSheetProps {
  isOpen: boolean
  filters: SearchFilters
  onApply: (filters: SearchFilters) => void
  onClose: () => void
}

function FiltersSheet({ isOpen, filters, onApply, onClose }: FiltersSheetProps) {
  const [draft, setDraft] = useState(filters)

  const update = (changes: Partial<SearchFilters>) => setDraft({ ...draft, ...changes })

  const toggleStore = (store: string) =>
    update({ stores: draft.stores.includes(store) ? draft.stores.filter((item) => item !== store) : [...draft.stores, store] })

  const apply = () => {
    onApply(draft)
    onClose()
  }

  const rangeInput = (field: RangeField, placeholder: string) => (
    <IonInput
      aria-label={placeholder}
      className={styles.input}
      fill="outline"
      type="number"
      inputmode="numeric"
      min="0"
      placeholder={placeholder}
      value={draft[field]}
      onIonInput={(event) => update({ [field]: event.detail.value ?? '' })}
    />
  )

  return (
    <Sheet
      isOpen={isOpen}
      title="Filtros"
      onClose={onClose}
      onWillPresent={() => setDraft(filters)}
      footer={
        <>
          <IonButton fill="outline" onClick={() => setDraft(EMPTY_FILTERS)}>Limpiar</IonButton>
          <IonButton onClick={apply}>Aplicar</IonButton>
        </>
      }
    >
      <p className={styles.label}>Tiendas</p>
      <div className={styles.chips}>
        {STORES.map((store) => (
          <IonChip
            key={store.id}
            className={draft.stores.includes(store.id) ? `${styles.chip} ${styles.active}` : styles.chip}
            onClick={() => toggleStore(store.id)}
          >
            <StoreDot store={store.id} size={18} />
            <IonLabel>{store.name}</IonLabel>
          </IonChip>
        ))}
      </div>

      <p className={styles.label}>Medida</p>
      <IonSegment className={styles.segment} value={draft.unit ?? ''}>
        {UNITS.map(([unit, label]) => (
          <IonSegmentButton key={unit} value={unit} onClick={() => update({ unit: draft.unit === unit ? null : unit })}>
            <IonLabel>{label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>

      <p className={styles.label}>Precio</p>
      <div className={styles.range}>
        {rangeInput('minPrice', 'Mínimo')}
        <span>–</span>
        {rangeInput('maxPrice', 'Máximo')}
      </div>

      <p className={styles.label}>Precio por unidad</p>
      <div className={styles.range}>
        {rangeInput('minPricePerUnit', 'Mínimo')}
        <span>–</span>
        {rangeInput('maxPricePerUnit', 'Máximo')}
      </div>

      <p className={styles.label}>Ordenar por</p>
      <IonSegment
        className={styles.segment}
        value={draft.sort}
        onIonChange={(event) => update({ sort: event.detail.value as SortKey })}
      >
        {SORTS.map(([sort, label]) => (
          <IonSegmentButton key={sort} value={sort}>
            <IonLabel>{label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>
    </Sheet>
  )
}

export default FiltersSheet
