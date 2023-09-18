import { pt as ptBr, en, es } from '@formkit/i18n'
// import { generateClasses } from '@formkit/themes'
import { DefaultConfigOptions } from '@formkit/vue'
// import { applicationIcons, refresh } from '@formkit/icons'
// import tailwindTheme from './tailwind-theme'

const config: DefaultConfigOptions = {
  // config: {
  //   classes: generateClasses(tailwindTheme),
  // },
  icons: {
    // ...applicationIcons, // spread an entire group of icons
    // formkit: `<svg ...` // or define your own
    // refresh,
  },
  locales: { en, es, ptBr },
  locale: 'ptBr',
}

export default config
