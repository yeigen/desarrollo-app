import { Preferences } from '@capacitor/preferences'

const PREFIX = 'cache:'

export async function readCache<T>(key: string): Promise<T | null> {
  const { value } = await Preferences.get({ key: PREFIX + key })
  return value ? JSON.parse(value) : null
}

export function writeCache(key: string, value: unknown) {
  return Preferences.set({ key: PREFIX + key, value: JSON.stringify(value) })
}

export async function clearCache() {
  const { keys } = await Preferences.keys()
  await Promise.all(keys.filter((key) => key.startsWith(PREFIX)).map((key) => Preferences.remove({ key })))
}
