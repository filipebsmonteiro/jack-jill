import { StateTree } from 'pinia'
import { useI18n } from 'vue-i18n'

export default {
  competitionStatuses: (state: StateTree) => {
    const { t } = useI18n()
    return state.statuses.map(value => ({
      label: t(`subscription.status.${value}`, value),
      value,
    }))
  },
  eventStatuses: (state: StateTree) => {
    const { t } = useI18n()
    return state.statuses.map(value => ({
      label: t(`subscription.status.${value}`, value),
      value,
    }))
  },
}
