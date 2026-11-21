/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_TILES_URL: string
  readonly VITE_OPENCAGE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
