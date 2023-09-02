import { SessionStorage, Cookie } from 'Resources/helpers/browser-storage'
import { decodeJwt } from 'Resources/helpers/functions'
import constants from 'Resources/providers/constants'
import Auth from 'Resources/repositories/Auth/Auth'
import { InertiaFormProps } from 'Resources/repositories/Base/Repository'

export async function login (params: InertiaFormProps) {
  this.loading = true
  await Auth.login(params)
    .then(() => {
      const token = Cookie.get(constants.storage.cookie.TOKEN)
      this.token = `${token}`.slice(2)
      const parsed = decodeJwt(this.token)
      this.user = parsed.message
      SessionStorage.set(constants.storage.session.USER, parsed.message)
    })
  this.loading = false
}

export async function logout (form: InertiaFormProps) {
  return Auth.logout(form)
    .then(() => SessionStorage.remove(constants.storage.session.USER))
}
