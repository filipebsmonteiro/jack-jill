import CompetitionRepository from 'Resources/repositories/CompetitionRepository'
import CompetitionScoreRepository from 'Resources/repositories/CompetitionScoreRepository'
import SubscriptionRepository from 'Resources/repositories/SubscriptionRepository'

export default {
  async load () {
    this.loading = true

    await CompetitionRepository.fetch()
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Load Competitions')
        console.error(error)
        this.list = []
      })

    this.loading = false
  },
  async create (params: any) {
    this.loading = true
    await CompetitionRepository.post(params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Create Competition')
        throw error
      })

    this.loading = false
  },
  async find (id: string | number, params: any = null) {
    this.loading = true

    await CompetitionRepository.find(id, params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error(`Error On Load Competition: ${id}`)
        console.error(error)
        this.current = null
      })

    this.loading = false
  },
  async update (id: string | number, params: any) {
    this.loading = true

    await CompetitionRepository.put(id, params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Edit Competition')
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async delete (id: string | number) {
    this.loading = true

    await CompetitionRepository.delete(id)
      .catch((error) => {
        console.error('Error On Delete Competition')
        console.error(error)
      })

    this.loading = false
  },

  async loadSubscribes (params: any) {
    this.loading = true

    await CompetitionRepository.loadSubscribes(params)
      .then(response => {
        const { users = [], ...event } = response.data
        this.subscribes = users
        this.current = event
      })
      .catch((error) => {
        console.error('Error On Load Competition Subscribers')
        console.error(error)
      })

    this.loading = false
  },
  async subscribe (id: string | number, userId: string | number) {
    this.loading = true

    await CompetitionRepository.subscribe(id, userId)
      .then(response => {
        const { users = [], ...event } = response.data
        this.subscribes = [...this.subscribes, ...users]
        this.current = event
      })
      .catch((error) => {
        console.error('Error On Subscribe Competition')
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async unsubscribe (id: string | number, userId: string | number) {
    this.loading = true

    await CompetitionRepository.unsubscribe(id, userId)
      .then(() => this.subscribes = this.subscribes.filter(user => user.id !== userId))
      .catch((error) => {
        console.error('Error On Unsubscribe Competition')
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async updateSubscription (params: { eventId: string, userId: string, status: string }) {
    this.loading = true

    await SubscriptionRepository.updateSubscription('competition', params)
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Update Competition Subscription')
        console.error(error)
      })

    this.loading = false
  },

  async loadScores (params: any) {
    this.loading = true

    await CompetitionScoreRepository.load(params)
      .then(response => this.scores = response.data)
      .catch((error) => {
        console.error('Error On Load Competition Scores')
        console.error(error)
      })

    this.loading = false
  },
  async persistScore (params: { competitionId: string, competitorId: string, judgeId: string, score: number }) {
    this.loading = true

    await CompetitionScoreRepository.persist(params)
      .then(response => {
        const score = response.data
        this.scores = this.scores.map(s => {
          if (score.competitor_id === s.competitor_id && score.judge_id === s.judge_id) {
            s = { ...s, ...score }
          }
          return s
        })
      })
      .catch((error) => {
        console.error('Error On Update Score')
        console.error(error)
      })

    this.loading = false
  },
}
