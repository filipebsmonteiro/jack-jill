import CompetitionRepository from 'Resources/repositories/CompetitionRepository'

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
  async find (id: string | number) {
    this.loading = true

    await CompetitionRepository.find(id)
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
}
