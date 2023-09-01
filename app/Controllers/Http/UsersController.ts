import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateValidator from 'App/Validators/User/CreateValidator'

export default class UsersController {
  public async index ({}: HttpContextContract) {
    const users = await User.query()
      .preload('events')
      .preload('competitions')
    return users
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const user = await User.create(payload)
    return response.status(201).json({ user })
  }

  public async show ({}: HttpContextContract) {}

  public async update ({}: HttpContextContract) {}

  public async destroy ({}: HttpContextContract) {}
}
