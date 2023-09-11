import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class CompetitionRepository extends ApiRepository {
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
