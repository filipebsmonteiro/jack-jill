import ApiRepository from 'Resources/repositories/Base/ApiRepository'

export default abstract class UserSubscriptableRepository extends ApiRepository {
  public async loadSubscribes (params: any) {
    return this.axios.get(`${this.endpoint}/loadSubscribes`, { params })
  }
  public async subscribe (id: string | number, userId: string | number) {
    return this.axios.post(`${this.endpoint}/subscribe`, { id, userId })
  }

  public async unsubscribe (id: string | number, userId: string | number) {
    return this.axios.post(`${this.endpoint}/unsubscribe`, { id, userId })
  }
}
