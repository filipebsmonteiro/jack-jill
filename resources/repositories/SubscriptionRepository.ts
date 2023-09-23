import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class SubscriptionRepository extends ApiRepository {
  constructor () {
    super('/api/v1/subscription')
  }

  public async updateSubscription (entity: string, params: any) {
    return await this.axios.put(`${this.endpoint}/${entity}`, params)
  }
}

export default new SubscriptionRepository()
