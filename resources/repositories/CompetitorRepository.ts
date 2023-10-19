import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class CompetitorRepository extends ApiRepository {
  constructor () {
    super('/api/v1/competitor')
  }
}

export default new CompetitorRepository()
