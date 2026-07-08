/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_KEY: string
  readonly VITE_TOUR_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
