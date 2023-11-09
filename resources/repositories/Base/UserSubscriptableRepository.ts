import ApiRepository from 'Resources/repositories/Base/ApiRepository'

export default abstract class UserSubscriptableRepository extends ApiRepository {
  public async loadSubscription (params: any) {
    return this.axios.get(`${this.endpoint}/loadSubscription`, { params })
  }

  public async loadSubscribes (params: any) {
    return this.axios.get(`${this.endpoint}/loadSubscribes`, { params })
  }

  public async subscribe (params: {id: string | number, userId: string | number}) {
    return this.axios.post(`${this.endpoint}/subscribe`, params)
  }

  public async unsubscribe (id: string | number, userId: string | number) {
    return this.axios.post(`${this.endpoint}/unsubscribe`, { id, userId })
  }
}
