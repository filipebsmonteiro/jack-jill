import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class EventRepository extends ApiRepository {
  constructor () {
    super('/api/v1/event')
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

export default new EventRepository()
