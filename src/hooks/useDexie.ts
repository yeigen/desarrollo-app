import type { EntityTable, IDType, InsertType, UpdateSpec } from 'dexie'
import { useLiveQuery } from 'dexie-react-hooks'

export function useDexie<T extends { id: number }>(
  table: EntityTable<T, 'id'>,
  filterFn: (item: T) => boolean,
) {
  const results = useLiveQuery(() => table.filter(filterFn).toArray(), [table, filterFn])

  const addItem = (data: InsertType<T, 'id'>) => table.add(data)

  const updateItem = (id: IDType<T, 'id'>, changes: UpdateSpec<InsertType<T, 'id'>>) => table.update(id, changes)

  const removeItem = (id: IDType<T, 'id'>) => table.delete(id)

  return { results: results ?? [], isPending: results === undefined, addItem, updateItem, removeItem }
}
