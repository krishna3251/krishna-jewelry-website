/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional contact + social details surfaced in the footer. */
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_PINTEREST_URL?: string;
  readonly VITE_FACEBOOK_URL?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
