import { SessionStorage } from 'Resources/helpers/browser-storage'
import constants from 'Resources/providers/constants'

export async function setLocale (locale: string) {
  SessionStorage.set(constants.storage.session.LOCALE, locale)
  this.locale = locale
}

export async function setTheme (theme: string) {
  SessionStorage.set(constants.storage.session.THEME, theme)
  this.theme = theme
}
