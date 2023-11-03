import UserSubscriptableRepository from 'Resources/repositories/Base/UserSubscriptableRepository'

class CompetitionScoreRepository extends UserSubscriptableRepository {
  constructor () {
    super('/api/v1/competition/score')
  }

  public async load (params: any) {
    return this.axios.get(`${this.endpoint}/load`, params)
  }

  public async persist (params: any) {
    return this.axios.post(`${this.endpoint}/persist`, params)
  }
}

export default new CompetitionScoreRepository()
