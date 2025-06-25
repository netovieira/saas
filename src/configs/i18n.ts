export const i18n = {
  defaultLocale: 'br',
  locales: ['en', 'br'],
  langDirection: {
    en: 'ltr',
    br: 'ltr',
  }
} as const

export type Locale = (typeof i18n)['locales'][number]
