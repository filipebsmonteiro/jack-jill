import { pt as ptBr, en, es } from '@formkit/i18n'
// import { generateClasses } from '@formkit/themes'
import { DefaultConfigOptions } from '@formkit/vue'
// import tailwindTheme from './tailwind-theme'

const config: DefaultConfigOptions = {
  // config: {
  //   classes: generateClasses(tailwindTheme),
  // },
  locales: { en, es, ptBr },
  locale: 'ptBr',
}

export default config
