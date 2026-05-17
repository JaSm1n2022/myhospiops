/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ANTHROPIC_API_KEY: string
  readonly VITE_DOWNLOAD_READING_MATERIAL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
