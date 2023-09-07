import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class CompetitionRepository extends ApiRepository {
  constructor () {
    super('/api/v1/competition')
  }
}

export default new CompetitionRepository()
