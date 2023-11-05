import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CompetitionLevel from 'App/Models/CompetitionLevel'
import CreateValidator from 'App/Validators/Competition/Level/CreateValidator'
import UpdateValidator from 'App/Validators/Competition/Level/UpdateValidator'

export default class CompetitionLevelsController {
  public async index ({ response }: HttpContextContract) {
    const levels = await CompetitionLevel.query()
    return response.status(200).json(levels)
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const level = await CompetitionLevel.create(payload)
    return response.status(201).json(level)
  }

  public async show ({ request, response }: HttpContextContract) {
    const level = await CompetitionLevel.findOrFail(request.param('id'))
    return response.status(200).json(level.serialize())
  }

  public async update ({ request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)

    await CompetitionLevel.query()
      .where('id', request.param('id'))
      .update(payload)

    const level = await CompetitionLevel.findOrFail(request.param('id'))
    return response.status(200).json(level.serialize())
  }

  public async destroy({}: HttpContextContract) {}
}
