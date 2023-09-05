import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class UserRepository extends ApiRepository {
  constructor () {
    super('/api/v1/user')
  }

  public async post (params: any = null) {
    if (params.image) {
      params = this.parseToFormData(params)
    }
    return await super.post(params)
  }

  public async put (id: string | number, params: any = null) {
    if (params.image) {
      params = this.parseToFormData(params)
    }
    return await super.put(id, params)
  }
}

export default new UserRepository()
