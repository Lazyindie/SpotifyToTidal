/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />

interface ImportMetaEnv {
  readonly VITE_THEME?: string
  readonly VITE_RTL?: string
  readonly VITE_DENSITY?: string
  readonly VITE_MOBILE_BREAKPOINT?: string
  readonly VITE_PRIMARY_COLOR?: string
  readonly VITE_SECONDARY_COLOR?: string
  readonly VITE_ACCENT_COLOR?: string
  readonly VITE_ERROR_COLOR?: string
  readonly VITE_INFO_COLOR?: string
  readonly VITE_SUCCESS_COLOR?: string
  readonly VITE_WARNING_COLOR?: string
  readonly VITE_PRIMARY_COLOR_DARK?: string
  readonly VITE_SECONDARY_COLOR_DARK?: string
  readonly VITE_ACCENT_COLOR_DARK?: string
  readonly VITE_ERROR_COLOR_DARK?: string
  readonly VITE_INFO_COLOR_DARK?: string
  readonly VITE_SUCCESS_COLOR_DARK?: string
  readonly VITE_WARNING_COLOR_DARK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
