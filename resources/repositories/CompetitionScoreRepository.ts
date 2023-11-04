import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class CompetitionScoreRepository extends ApiRepository {
  constructor () {
    super('/api/v1/competition/score')
  }
}

export default new CompetitionScoreRepository()
