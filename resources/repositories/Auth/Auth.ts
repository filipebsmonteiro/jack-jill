import ApiRepository from 'Resources/repositories/Base/ApiRepository'
import { InertiaFormProps } from 'Resources/repositories/Base/Repository'

class Auth extends ApiRepository {
  constructor () {
    super('/api/v1/auth')
  }

  public login (form: any) {
    this.form = form
    return new Promise((resolve, reject) => {
      this.form?.post(`${this.endpoint}/login`, {
        onSuccess: (result) => resolve(result),
        onError: (error) => reject(error),
      })
    })
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

export default new Auth()
