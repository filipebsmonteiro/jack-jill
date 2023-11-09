import EventRepository from 'Resources/repositories/EventRepository'
import SubscriptionRepository from 'Resources/repositories/SubscriptionRepository'

export default {
  async load () {
    this.loading = true

    await EventRepository.fetch()
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Load Events')
        console.error(error)
        this.list = []
      })

    this.loading = false
  },
  async create (params: any) {
    this.loading = true
    await EventRepository.post(params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Create Event')
        throw error
      })

    this.loading = false
  },
  async find (id: string | number) {
    this.loading = true

    await EventRepository.find(id)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error(`Error On Load Event: ${id}`)
        console.error(error)
        this.current = null
      })

    this.loading = false
  },
  async update (id: string | number, params: any) {
    this.loading = true

    await EventRepository.put(id, params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Edit Event')
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async delete (id: string | number) {
    this.loading = true

    await EventRepository.delete(id)
      .catch((error) => {
        console.error('Error On Delete Event')
        console.error(error)
      })

    this.loading = false
  },

  async loadSubscribes (params: any) {
    this.loading = true

    await EventRepository.loadSubscribes(params)
      .then(response => {
        const { users = [], ...event } = response.data
        this.subscribes = users
        this.current = event
      })
      .catch((error) => {
        console.error('Error On Subscribe Event')
        console.error(error)
      })

    this.loading = false
  },
  async subscribe (id: string | number, userId: string | number) {
    this.loading = true

    await EventRepository.subscribe({ id, userId })
      .then(response => {
        const { users = [], ...event } = response.data
        this.subscribes = [...this.subscribes, ...users]
        this.current = event
      })
      .catch((error) => {
        console.error('Error On Subscribe Event')
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async unsubscribe (id: string | number, userId: string | number) {
    this.loading = true

    await EventRepository.unsubscribe(id, userId)
      .then(() => this.subscribes = this.subscribes.filter(user => user.id !== userId))
      .catch((error) => {
        console.error('Error On Unsubscribe Event')
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async updateSubscription (
    params: { competitionId: string, userId: string, status?: string, score?: number}
  ) {
    this.loading = true

    await SubscriptionRepository.updateSubscription('competition', params)
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Update Competition Subscription')
        console.error(error)
      })

    this.loading = false
  },
}
