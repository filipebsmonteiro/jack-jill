import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/Models/User'

export default class AuthController {
  public async login ({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    // const token = await auth.use('api').authenticate()
    // const token = await auth.use('api').attempt.attempt(email, password)
    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }

  // The register method Creates a New User object and save it to the database.
  // public async register ({ request, auth }: HttpContextContract) {
  public async register ({ request }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const name = request.input('name')
    const user = new User()
    user.email = email
    user.password = password
    user.first_name = name
    await user.save()
    // const token = await auth.use('api').login(user, {
    const token = await auth.use('api').login(user, {
      expiresIn: '10 days',
    })
    return token.toJSON()
  }
}
