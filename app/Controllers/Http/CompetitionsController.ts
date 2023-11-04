import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { LucidRow } from '@ioc:Adonis/Lucid/Orm'
import Competition from 'App/Models/Competition'
import Schedule from 'App/Models/Schedule'
import CreateValidator from 'App/Validators/Competition/CreateValidator'
import SubscribeValidator from 'App/Validators/Competition/SubscribeValidator'
import UpdateValidator from 'App/Validators/Competition/UpdateValidator'

export default class CompetitionsController {
  private attachPivotColumns (entity: LucidRow, relationKey: string): Object {
    const relations = entity[relationKey]?.map((relation: LucidRow) => {
      let columns = {}
      Object.entries(relation.$extras).map(([key, value]) => ({
        [key.replace('pivot_', '')]: value,
      })).forEach(element => columns = {...columns, ...element})

      return { ...relation.serialize(), ...columns }
    })

    return {
      ...entity.serialize(),
      [relationKey]: relations,
    }
  }

  public async index ({ response }: HttpContextContract) {
    const competitions = await Competition.query()
    return response.status(200).json(competitions)
  }

  public async store ({ request, response }: HttpContextContract) {
    const { schedules, ...payload } = await request.validate(CreateValidator)

    const competition = await Database.transaction(async () => {
      let comp: Competition = await Competition.create(payload)

      if (schedules) {
        const schedulesIds = await Promise.all(
          schedules.map(async (schedule) => await Schedule.create(schedule))
        ).then((schedules) => schedules.map((schedule) => schedule.id))

        comp.related('schedules').attach(schedulesIds)
      }

      return comp
    })

    return response.status(201).json(competition)
  }

  public async show ({ request, response }: HttpContextContract) {
    let query = Competition.query().where('id', request.param('id'))
    const relations = {
      schedules: {
        orderBy: 'start_date',
      },
      users: {
        select: ['first_name', 'last_name'],
      },
    }

    if (request.qs().relationships) {
      request.qs().relationships.forEach(relation => {
        query = query.preload(relation, (builder) => {
          Object.entries(relations[relation])
            .forEach(([method, value]) => {
              if (Array.isArray(value)) {
                builder[method](...value)
                return
              }
              builder[method](value)
            })
        })
      })
    }

    const competition = await query.firstOrFail()

    return response.status(200).json(
      this.attachPivotColumns(competition, 'users')
    )
  }

  public async update ({ request, response }: HttpContextContract) {
    const { schedules, ...payload } = await request.validate(UpdateValidator)

    const competition = await Database.transaction(async () => {
      await Competition.query()
        .where('id', request.param('id'))
        .update(payload)

      const comp = await Competition.findOrFail(request.param('id'))

      if (schedules) {
        const schedulesIds = await Promise.all(
          schedules.map(async ({ id = undefined, ...schedule }) => {
            return await Schedule.updateOrCreate({ id }, schedule)
          })
        ).then((schedules) => schedules.map((schedule) => schedule.id))

        comp.related('schedules').sync(schedulesIds)
      }

      return comp
    })
    return response.status(200).json(competition.serialize())
  }

  public async destroy ({ request }: HttpContextContract) {
    const competition = await Competition.query()
      .where('id', request.param('id'))
      .firstOrFail()
    competition.delete()
    return true
  }

  public async loadSubscribes ({ request, response }: HttpContextContract) {
    let query = Competition.query().preload('users', builder => {
      builder.select('id', 'first_name', 'last_name', 'country')
    })

    Object.entries(request.qs()).map(([column, value]) => query = query.where(column, value))

    const competition = await query.firstOrFail()
    return response.status(200).json(
      this.attachPivotColumns(competition, 'users')
    )
  }

  public async subscribe ({ request, response }: HttpContextContract) {
    const { id, userId } = await request.validate(SubscribeValidator)
    let competition = await Competition.findOrFail(id)
    await competition.related('users').attach([userId])

    competition = await Competition.query()
      .preload('users', query => {
        query.select('id', 'first_name', 'last_name', 'country')
          .wherePivot('user_id', userId)
      })
      .where('id', id)
      .firstOrFail()

    const users = competition.users.map((user) =>
      ({...user.toJSON(), status: user.$extras.pivot_status})
    )

    return response.status(200).json({
      ...competition.serialize(),
      users,
    })
  }

  public async unsubscribe ({ request, response }: HttpContextContract) {
    const { id, userId } = await request.validate(SubscribeValidator)
    const competition = await Competition.findOrFail(id)
    await competition.related('users').detach([userId])
    return response.status(200).json(competition.serialize())
  }
}
