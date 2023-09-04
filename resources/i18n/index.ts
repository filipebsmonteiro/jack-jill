import { createI18n } from 'vue-i18n'
import en from './en'
import es from './es'
import ptBr from './pt-br'

export default createI18n({
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
