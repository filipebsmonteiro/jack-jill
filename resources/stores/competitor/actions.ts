import CompetitorRepository from 'Resources/repositories/CompetitorRepository'

export default {
  async load () {
    this.loading = true

    await CompetitorRepository.fetch()
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Load Competitors')
        console.error(error)
        this.list = []
      })

    this.loading = false
  },

  async loadCompetitorsResume (params: any) {
    this.loading = params

    // await CompetitorRepository.loadSubscribes(params)
    //   .then(response => {
    //   })
    //   .catch((error) => {
    //     console.error('Error On Load Competitors Resume')
    //     console.error(error)
    //   })

    this.loading = false
  },
}
