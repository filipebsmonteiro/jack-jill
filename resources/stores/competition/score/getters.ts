import { StateTree } from 'pinia'

export default {
  getScore: (state: StateTree) => {
    return (levelId, round = null, judgeId = null, competitorId = null) => {
      let searchable = state.list.filter(score => score.level_id === levelId)

      if (round) {
        searchable = searchable.filter(score => score.round === round)
      }
      if (judgeId) {
        searchable = searchable.filter(score => score.judge_id === judgeId)
      }
      if (competitorId) {
        searchable = searchable.find(score => score.competitor_id === competitorId)?.score
      }

      return searchable
    }
  },
}
