import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class CompetitionLevelRepository extends ApiRepository {
  constructor () {
    super('/api/v1/competition/level')
  }
}

export default new CompetitionLevelRepository()
