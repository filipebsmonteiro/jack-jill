import { defineStore } from 'pinia'

import state from './state'
import getters from './getters'
import * as actions from './actions'

export const useSystemStore = defineStore('system', {
  state,
  getters,
  actions: {
    ...actions,
  },
})
