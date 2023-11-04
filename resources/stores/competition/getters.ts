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
    return state.subscribes?.filter((user) => user.role === 'judge') || []
  },
  competitorsGroupByLevel: (state) => {
    const competitors = state.subscribes?.filter((user) =>
      (['leader', 'follower'].includes(user.role) || !user.role) &&
      user?.status === 'approved'
    )

    return competitors.reduce((acc, user) => {
      if (acc[user.level_id]) {
        acc[user.level_id].push(user)
        return acc
      }

      acc[user.level_id] = [user]
      return acc
    }, {})
  },

  getScore: (state: StateTree) => {
    return (competitorId, judgeId, round) => state.scores
      .find((score) =>
        score.competitor_id === competitorId &&
        score.judge_id === judgeId &&
        score.round === round
      )?.score
  },
}
