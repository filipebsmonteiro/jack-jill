import { SessionStorage } from 'Resources/helpers/browser-storage'
// import { decodeJwt } from 'Resources/helpers/functions'
import constants from 'Resources/providers/constants'
import Auth from 'Resources/repositories/AuthRepository'
import { InertiaFormProps } from 'Resources/repositories/Base/Repository'

export async function login (params: any) {
  this.loading = true
  await Auth.login(params)
    .then(({ data: user }) => {
      this.user = user
      SessionStorage.set(constants.storage.session.USER, user)
    })
  this.loading = false
}

export async function logout (form: InertiaFormProps) {
  return Auth.logout(form)
    .then(() => SessionStorage.remove(constants.storage.session.USER))
}
