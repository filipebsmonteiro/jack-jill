import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersCompetitions from 'App/Models/ManyToMany/UsersCompetitions'

export default class CompetitorsController {
  public async resume ({ response }: HttpContextContract) {
    let events = await UsersCompetitions.query()
      .distinct('user_id')
      .where('score', '>', 0)
      // .then(response => response.map((event) => ({
      //   ...event.toJSON(),
      //   users: event.$extras.users_count,
      // })))

    return response.status(200).json(events)
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
