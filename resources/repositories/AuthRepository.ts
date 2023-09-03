import ApiRepository from 'Resources/repositories/Base/ApiRepository'
import { InertiaFormProps } from 'Resources/repositories/Base/Repository'

class AuthRepository extends ApiRepository {
  constructor () {
    super('/api/v1/auth')
  }

  public login (params: any) {
    return this.axios.post(`${this.endpoint}/login`, params)
  }

  public logout (form: InertiaFormProps) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.post(`${this.endpoint}/logout`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
  }
}

export default new AuthRepository()
