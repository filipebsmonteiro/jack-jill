import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersCompetitions from 'App/Models/ManyToMany/UsersCompetitions'
import UsersEvents from 'App/Models/ManyToMany/UsersEvents'
import UpdateValidator from 'App/Validators/Subscription/UpdateValidator'

export default class SubscriptionsController {
  public async updateCompetitionSubscription ({ request, response }: HttpContextContract) {
    const { competitionId, userId, levelId, ...payload } = await request.validate(UpdateValidator)
    const values = levelId ? { level_id: levelId } : payload

    await UsersCompetitions.query()
      .where({ user_id: userId, competition_id: competitionId })
      .update(values)

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
