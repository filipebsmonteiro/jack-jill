import UserSubscriptableRepository from 'Resources/repositories/Base/UserSubscriptableRepository'

class CompetitionRepository extends UserSubscriptableRepository {
  constructor () {
    super('/api/v1/competition')
  }

  public async post (params: any = null) {
    return await super.post(
      this.parseToFormData(params)
    )
  }

  public async put (id: string | number, params: any = null) {
    return await super.put(
      id,
      this.parseToFormData(params)
    )
  }
}

export default new CompetitionRepository()
