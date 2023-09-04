import { StateTree } from 'pinia'
import { SessionStorage } from 'Resources/helpers/browser-storage'
import constants from 'Resources/providers/constants'

export default {
  getTheme: (state: StateTree) => {
    const storage = SessionStorage.get(constants.storage.session.THEME)
    if (!state.theme && storage || state.theme !== storage){
      state.theme = storage
      return state?.theme
    }

    return state?.theme
  },
  getLocale: (state: StateTree) => {
    const storage = SessionStorage.get(constants.storage.session.LOCALE)
    if (!state.locale && storage || state.locale !== storage){
      state.locale = storage
      return state?.locale
    }

    return state?.locale
  },
}
