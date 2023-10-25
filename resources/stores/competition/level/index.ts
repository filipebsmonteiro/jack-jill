import { defineStore } from 'pinia'

import state from './state'
import getters from './getters'
import actions from './actions'

export const useCompetitionLevelStore = defineStore('competitionLevel', {
  state,
  getters,
  actions: {
    ...actions,
  },
})
