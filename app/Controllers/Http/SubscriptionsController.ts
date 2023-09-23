import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersCompetitions from 'App/Models/ManyToMany/UsersCompetitions'
import UsersEvents from 'App/Models/ManyToMany/UsersEvents'
import UpdateValidator from 'App/Validators/Subscription/UpdateValidator'

export default class SubscriptionsController {
  public async listCompetitionStatuses ({ response }: HttpContextContract) {
    let query = await Database.rawQuery(`
      SELECT SUBSTRING(COLUMN_TYPE,5) as STATUS
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA='${process.env.MYSQL_DB_NAME}'
          AND TABLE_NAME='${UsersCompetitions.table}'
          AND COLUMN_NAME='status'
    `)

    return response.status(200).json(query)
  }

  public async updateCompetitionSubscription ({ request, response }: HttpContextContract) {
    const { competitionId, userId, ...payload } = await request.validate(UpdateValidator)
    await UsersCompetitions.query()
      .where({ user_id: userId, competition_id: competitionId })
      .update(payload)

    const subscription = await UsersCompetitions.query()
      .where({ user_id: userId, competition_id: competitionId })
      .firstOrFail()

    return response.status(200).json(subscription)
  }

  public async updateEventSubscription ({ request, response }: HttpContextContract) {
    const { eventId, userId, status } = await request.validate(UpdateValidator)
    await UsersEvents.query()
      .where({ user_id: userId, event_id: eventId })
      .update({ status })

    const subscription = await UsersEvents.query()
      .where({ user_id: userId, event_id: eventId })
      .firstOrFail()

    return response.status(200).json(subscription)
  }
}
