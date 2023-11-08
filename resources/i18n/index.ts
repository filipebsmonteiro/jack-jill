import { createI18n } from 'vue-i18n'
import en from './en'
import es from './es'
import ptBr from './pt-br'

const instance = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'ptBr', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    es,
    ptBr,
  },
})
export default instance

export const i18n = instance.global
export const { t } = i18n
