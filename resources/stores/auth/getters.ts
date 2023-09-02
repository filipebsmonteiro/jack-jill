import { StateTree } from 'pinia'
import { Cookie, SessionStorage } from 'Resources/helpers/browser-storage'
import { decodeJwt } from 'Resources/helpers/functions'
import constants from 'Resources/providers/constants'

export default {
  avatar: (state: StateTree) => state?.user?.photoURL,

  isLogged () {
    return this.getUser !== null && this.getUser !== undefined
  },

  getUser: (state: StateTree) => {
    if (!state.user && SessionStorage.get(constants.storage.session.USER)){
      state.user = SessionStorage.get(constants.storage.session.USER)
      return state?.user
    }

    const token = Cookie.get(constants.storage.cookie.TOKEN)
    if (token) {
      state.token = `${token}`.slice(2)
      const parsed = decodeJwt(state.token)
      state.user = parsed.message
      SessionStorage.set(constants.storage.session.USER, parsed.message)
    }

    return state?.user
  },
}
