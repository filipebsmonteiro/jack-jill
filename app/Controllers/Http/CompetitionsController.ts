import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Competition from 'App/Models/Competition'
import CreateValidator from 'App/Validators/Competition/CreateValidator'
import UpdateValidator from 'App/Validators/Competition/UpdateValidator'

export default class CompetitionsController {
  public async index ({ response }: HttpContextContract) {
    const competitions = await Competition.query()
    return response.status(200).json(competitions)
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    let competition: Competition = await Competition.create(payload)

    return response.status(201).json(competition)
  }

  public async show ({ request, response }: HttpContextContract) {
    const competition = await Competition.query()
      .where('id', request.param('id'))
      .firstOrFail()
    return response.status(200).json(competition.serialize())
  }

  public async update ({ request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)
    await Competition.query()
      .where('id', request.param('id'))
      .update(payload)

    const competition = await Competition.query()
      .where('id', request.param('id'))
      .firstOrFail()
    return response.status(200).json(competition.serialize())
  }

  public async destroy ({ request }: HttpContextContract) {
    const competition = await Competition.query()
      .where('id', request.param('id'))
      .firstOrFail()
    competition.delete()
    return true
  }
}
