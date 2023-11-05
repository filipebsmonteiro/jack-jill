import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class CompetitionScoreRepository extends ApiRepository {
  constructor () {
    super('/api/v1/competition/score')
  }

  public deleteRound (params: {competitionId: string, levelId: string, round: string}) {
    return this.axios.delete(`${this.endpoint}/${params.competitionId}`, {params})
  }
}

export default new CompetitionScoreRepository()
