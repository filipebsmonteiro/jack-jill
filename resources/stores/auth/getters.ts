import { StateTree } from 'pinia'
import { SessionStorage } from 'Resources/helpers/browser-storage'
import constants from 'Resources/providers/constants'

export default {
  avatar: (state: StateTree) => state?.user?.image,

  isLogged () {
    return this.getUser !== null && this.getUser !== undefined
  },

  getUser: (state: StateTree) => {
    if (!state.user && SessionStorage.get(constants.storage.session.USER)){
      state.user = SessionStorage.get(constants.storage.session.USER)
      return state?.user
    }

    return state?.user
  },
}
