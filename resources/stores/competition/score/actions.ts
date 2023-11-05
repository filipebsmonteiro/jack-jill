import CompetitionScoreRepository from 'Resources/repositories/CompetitionScoreRepository'

export default {
  async load (params: any) {
    this.loading = true

    await CompetitionScoreRepository.fetch(params)
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Load Competition Scores')
        console.error(error)
        this.list = []
      })

    this.loading = false
  },
  async persist (params: {
    competitionId: string,
    competitorId: string,
    judgeId: string,
    levelId: string,
    round: string,
    score: number,
  }) {
    this.loading = true

    await CompetitionScoreRepository.post(params)
      .then(response => {
        const score = response.data
        this.list = this.list.map(s => {
          if (score.competitor_id === s.competitor_id && score.judge_id === s.judge_id) {
            s = { ...s, ...score }
          }
          return s
        })
      })
      .catch((error) => {
        console.error('Error On Persist Score')
        console.error(error)
      })

    this.loading = false
  },
  async persistBatch (scores: {
    competitionId: string,
    competitorId: string,
    judgeId: string,
    levelId: string,
    round: string,
    score: number
  }[]) {
    this.loading = true

    await CompetitionScoreRepository.post({ scores })
      .then(response => this.list = [...this.list, ...response.data])
      .catch((error) => {
        console.error('Error On Persist Batch Score')
        console.error(error)
      })

    this.loading = false
  },
  async deleteRound (params: {competitionId: string, levelId: string, round: string}) {
    this.loading = true

    await CompetitionScoreRepository.deleteRound(params)
      .catch((error) => {
        console.error('Error On Delete Round')
        console.error(error)
      })

    this.loading = false
  },
}
