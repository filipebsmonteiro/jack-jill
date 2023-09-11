import EventRepository from 'Resources/repositories/EventRepository'

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
}
