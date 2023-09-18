import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import CreateValidator from 'App/Validators/User/CreateValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class UsersController {
  private async uploadFile (file: MultipartFileContract, id: string) {
    await file.move(Application.tmpPath('uploads/user'), {
      name: `${id}.${file.extname}`,
      overwrite: true,
    })
  }

  public async index ({ response }: HttpContextContract) {
    // const users = await User.query()
    //   // .preload('events')
    //   // .preload('competitions')
    //   .paginate(1, 10)
    const users = await User.query()
    return response.status(200).json(users)
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const { image, ...data } = payload
    let user = await User.create(data)

    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await this.uploadFile(file, user.id)
      await User.query().where('id', user.id)
        .update({ image: `user/${user.id}.${file.extname}` })

      user = await User.query().where('id', user.id)
        .firstOrFail()
    }

    return response.status(201).json(user.serialize())
  }

  public async show ({ request, response }: HttpContextContract) {
    const user = await User.query()
      .where('id', request.param('id'))
      .firstOrFail()
    return response.status(200).json(user.serialize())
  }

  // public async me ({ auth, response }: HttpContextContract) {
  //   const user = await User.query()
  //     .where('id', auth.user?.id as string)
  //     .firstOrFail()
  //   return response.status(200).json(user.serialize())
  // }

  public async autocomplete ({ request, response }: HttpContextContract) {
    const users = await User.query()
      .orWhere('first_name', 'like', `%${request.input('name')}%`)
      .orWhere('last_name', 'like', `%${request.input('name')}%`)
      .limit(10)
    return response.status(200).json(users.map((user) =>
      user.serialize({ fields: ['id', 'first_name', 'last_name', 'image'] })
    ))
  }

  public async update ({ request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)
    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await this.uploadFile(file, request.param('id'))
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
    return response.status(200).json(user.serialize())
  }

  public async destroy ({ request }: HttpContextContract) {
    const user = await User.query()
      .where('id', request.param('id'))
      .firstOrFail()
    user.delete()
    return true
  }
}
