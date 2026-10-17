import { Dexie, type EntityTable } from 'dexie'
import type { Fruit } from '../types'

export const localDb = new Dexie('desarrollo-app') as Dexie & {
  fruits: EntityTable<Fruit, 'id'>
}

localDb.version(1).stores({
  fruits: '++id, name',
})
