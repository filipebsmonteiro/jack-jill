import SubscriptionRepository from 'Resources/repositories/SubscriptionRepository'

export default {
  async updateCompetitionSubscription (
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
  async updateEventSubscription (params: { eventId: string, userId: string, status: string }) {
    this.loading = true

    await SubscriptionRepository.updateSubscription('event', params)
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Update Event Subscription')
        console.error(error)
      })

    this.loading = false
  },
}
