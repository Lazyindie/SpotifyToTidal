/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases } from '@/iconsets/custom'

// Environment variables
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD
const theme = import.meta.env.VITE_THEME || 'dark'
const rtl = import.meta.env.VITE_RTL === 'true'
const density = import.meta.env.VITE_DENSITY || 'default'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: theme,
    themes: {
      light: {
        colors: {
          primary: import.meta.env.VITE_PRIMARY_COLOR || '#1976D2',
          secondary: import.meta.env.VITE_SECONDARY_COLOR || '#424242',
          accent: import.meta.env.VITE_ACCENT_COLOR || '#82B1FF',
          error: import.meta.env.VITE_ERROR_COLOR || '#FF5252',
          info: import.meta.env.VITE_INFO_COLOR || '#2196F3',
          success: import.meta.env.VITE_SUCCESS_COLOR || '#4CAF50',
          warning: import.meta.env.VITE_WARNING_COLOR || '#FFC107',
        },
      },
      dark: {
        colors: {
          primary: import.meta.env.VITE_PRIMARY_COLOR_DARK || '#2196F3',
          secondary: import.meta.env.VITE_SECONDARY_COLOR_DARK || '#424242',
          accent: import.meta.env.VITE_ACCENT_COLOR_DARK || '#FF4081',
          error: import.meta.env.VITE_ERROR_COLOR_DARK || '#FF5252',
          info: import.meta.env.VITE_INFO_COLOR_DARK || '#2196F3',
          success: import.meta.env.VITE_SUCCESS_COLOR_DARK || '#4CAF50',
          warning: import.meta.env.VITE_WARNING_COLOR_DARK || '#FB8C00',
        },
      },
    },
  },
  display: {
    mobileBreakpoint: import.meta.env.VITE_MOBILE_BREAKPOINT || 'sm',
  },
  defaults: {
    global: {
      density: density as 'default' | 'comfortable' | 'compact',
    },
  },
  rtl: rtl,
  ssr: isProduction,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      custom,
    },
  },
})
