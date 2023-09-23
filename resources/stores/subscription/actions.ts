import SubscriptionRepository from 'Resources/repositories/SubscriptionRepository'

export default {
  async updateCompetitionStatus (params: { competitionId: string, userId: string, status: string }) {
    this.loading = true

    await SubscriptionRepository.updateStatus('competition', params)
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Update Subscription Status')
        console.error(error)
      })

    this.loading = false
  },
  async updateEventStatus (params: { eventId: string, userId: string, status: string }) {
    this.loading = true

    await SubscriptionRepository.updateStatus('event', params)
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Update Subscription Status')
        console.error(error)
      })

    this.loading = false
  },
}
