import { StateTree } from 'pinia'
import { useI18n } from 'vue-i18n'

export default {
  getStatuses: (state: StateTree) => {
    const { t } = useI18n()
    return [
      { value: null, label: 'Select Status...', attrs: { disabled: true } },
      ...state.statuses.map(status => ({
        label: t(`subscription.status.${status}`, status),
        value: status,
      })),
    ]
  },
  getRolesAsOptions: (state: StateTree) => {
    return [
      { value: null, label: 'Select Role...', attrs: { disabled: true } },
      ...state.roles.map(role => ({
        label: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })),
    ]
  },
  getJudges: (state: StateTree) => {
    return state.current?.users?.filter(user => user.role === 'judge') || []
  },
  getCompetitors: (state: StateTree) => {
    return state.current?.users?.filter(user => ['leader', 'follower'].includes(user.role) || !user.role) || []
  },
  getScore: (state) => {
    return (competitorId, judgeId) => state.scores
      .find((score) => score.competitor_id === competitorId && score.judge_id === judgeId)?.score
  },
}
