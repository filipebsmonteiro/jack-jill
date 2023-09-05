import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
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
    const { image, ...data } = payload
    let user: any = await User.create(data)

    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await file.move(Application.tmpPath('uploads/user'), {
        name: `${user.id}.${file.extname}`,
        overwrite: true,
      })
      user = await User.query()
        .where('id', user.id)
        .update({ image: `user/${user.id}.${file.extname}` })
    }

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
    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await file.move(Application.tmpPath('uploads/user'), {
        name: `${request.param('id')}.${file.extname}`,
        overwrite: true,
      })
    }

    await User.query()
      .where('id', request.param('id'))
      .update({
        ...payload,
        image: file ? `user/${request.input('id')}.${file.extname}` : undefined,
      })

    const user = await User.query()
      .where('id', request.param('id'))
      .firstOrFail()
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
