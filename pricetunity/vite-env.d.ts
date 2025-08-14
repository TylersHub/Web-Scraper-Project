/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string; // Add env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
