import CompetitionLevelRepository from 'Resources/repositories/CompetitionLevelRepository'

export default {
  async load () {
    this.loading = true

    await CompetitionLevelRepository.fetch()
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Load Competition Levels')
        console.error(error)
        this.list = []
      })

    this.loading = false
  },
  async create (params: any) {
    this.loading = true
    await CompetitionLevelRepository.post(params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Create Competition Level')
        throw error
      })

    this.loading = false
  },
  async find (id: string | number) {
    this.loading = true

    await CompetitionLevelRepository.find(id)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error(`Error On Load Competition Level: ${id}`)
        console.error(error)
        this.current = null
      })

    this.loading = false
  },
  async update (id: string | number, params: any) {
    this.loading = true

    await CompetitionLevelRepository.put(id, params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error(`Error On Edit Competition Level: ${id}`)
        console.error(error)
        throw error
      })

    this.loading = false
  },
  async delete (id: string | number) {
    this.loading = true

    await CompetitionLevelRepository.delete(id)
      .catch((error) => {
        console.error('Error On Delete Competition Level')
        console.error(error)
      })

    this.loading = false
  },
}
