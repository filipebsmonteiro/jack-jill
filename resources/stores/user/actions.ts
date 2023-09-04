import UserRepository from 'Resources/repositories/UserRepository'

export default {
  async load () {
    this.loading = true

    await UserRepository.fetch()
      .then(response => this.list = response.data)
      .catch((error) => {
        console.error('Error On Load Pessoas')
        console.error(error)
        this.list = []
      })

    this.loading = false
  },
  async create (params: any) {
    this.loading = true
    await UserRepository.post(params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Create User')
        throw error
      })

    this.loading = false
  },
  async find (id: string | number) {
    this.loading = true

    await UserRepository.find(id)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error(`Error On Load User: ${id}`)
        console.error(error)
        this.current = null
      })

    this.loading = false
  },
  async update (id: string | number, params: any) {
    this.loading = true

    await UserRepository.put(id, params)
      .then(response => this.current = response.data)
      .catch((error) => {
        console.error('Error On Edit User')
        console.error(error)
      })

    this.loading = false
  },
  async delete (id: string | number) {
    this.loading = true

    await UserRepository.delete(id)
      .catch((error) => {
        console.error('Error On Delete User')
        console.error(error)
      })

    this.loading = false
  },
}
