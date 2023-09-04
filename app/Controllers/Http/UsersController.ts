import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateValidator from 'App/Validators/User/CreateValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class UsersController {
  public async index ({}: HttpContextContract) {
    const users = await User.query()
    // .preload('events')
    // .preload('competitions')
    return users
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const user = await User.create(payload)
    return response.status(201).json({ user })
  }

  public async show ({ request }: HttpContextContract) {
    const user = await User.query()
      .where('id', request.param('id'))
      .firstOrFail()
    return user
  }

  public async update ({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)
    const user = await User.query()
      .where('id', request.param('id'))
      .update(payload)
    return user
  }

  public async destroy ({ request }: HttpContextContract) {
    const user = await User.query()
      .where('id', request.param('id'))
      .firstOrFail()
    user.delete()
    return true
  }
}
