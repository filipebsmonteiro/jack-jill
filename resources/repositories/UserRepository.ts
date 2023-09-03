import ApiRepository from 'Resources/repositories/Base/ApiRepository'

class UserRepository extends ApiRepository {
  constructor () {
    super('/api/v1/user')
  }
}

export default new UserRepository()
