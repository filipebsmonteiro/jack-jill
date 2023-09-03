import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateValidator from 'App/Validators/User/CreateValidator'

export default class AuthController {
  public async login ({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()
    return await auth.attempt(email, password)
      .then((user: User) => user.serialize({ fields: { omit: ['password'] } }))
      .catch(() => {
        return response.badRequest({
          props: { errors: ['Invalid credentials'] },
          url: '/auth/login',
          component: 'Auth/Login',
        })
      })
  }

  public async register ({ request }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const user = await User.create(payload)
    return user
  }

  public async logout ({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.clearCookie('token').redirect().toPath('/auth/login')
  }
}
