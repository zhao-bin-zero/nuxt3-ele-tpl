import { defineI18nConfig } from '@nuxtjs/i18n/dist/runtime/composables'
import i18n from '.'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: i18n.defaultLocaleCode,
  fallbackLocale: i18n.defaultLocaleCode
}))
