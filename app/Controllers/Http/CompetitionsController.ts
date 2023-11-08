import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import { LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Competition from 'App/Models/Competition'
import Schedule from 'App/Models/Schedule'
import CreateValidator from 'App/Validators/Competition/CreateValidator'
import SubscribeValidator from 'App/Validators/Competition/SubscribeValidator'
import UpdateValidator from 'App/Validators/Competition/UpdateValidator'

export default class CompetitionsController {
  private relations = {
    schedules: {
      orderBy: 'start_date',
    },
    users: {
      select: ['first_name', 'last_name'],
    },
  }

  private attachPivotColumnsIntoRelationship (entity: LucidRow, relationKey: string): Array<Record<string, any>> {
    return entity[relationKey]?.map((relation: LucidRow) => {
      let columns = {}
      Object.entries(relation.$extras).map(([key, value]) => ({
        [key.replace('pivot_', '')]: value,
      })).forEach(element => columns = {...columns, ...element})

      return { ...relation.serialize(), ...columns }
    })
  }

  private async uploadFile (file: MultipartFileContract, id: string) {
    await file.move(Application.tmpPath('uploads/competition'), {
      name: `${id}.${file.extname}`,
      overwrite: true,
    })
  }

  private preloadRelations (
    queryString: Record<string, any>,
    query: ModelQueryBuilderContract<typeof Competition>
  ): ModelQueryBuilderContract<typeof Competition> {
    let localQuery = query
    queryString.relationships.forEach(relation => {
      localQuery = query.preload(relation, (builder) => {
        Object.entries(this.relations[relation])
          .forEach(([method, value]) => {
            if (Array.isArray(value)) {
              builder[method](...value)
              return
            }
            builder[method](value)
          })
      })
    })
    return localQuery
  }

  public async index ({ request, response }: HttpContextContract) {
    const { currentPage, orderBy, orderDirection, perPage } = request.qs()
    let query = Competition.query()
    let competitions: any = []

    if (request.qs().relationships) {
      query = this.preloadRelations(request.qs(), query)
    }

    if (orderBy) {
      query = query.orderBy(orderBy, orderDirection)
    }

    if (currentPage && perPage) {
      competitions = await query.paginate(currentPage, perPage)
    } else {
      competitions = await query.then(competitions => {
        return competitions.map(competition => ({
          ...competition.serialize(),
          schedules: this.attachPivotColumnsIntoRelationship(competition, 'schedules'),
        }))
      })
    }

    return response.status(200).json(competitions)
  }

  public async store ({ request, response }: HttpContextContract) {
    const { image, schedules, ...payload } = await request.validate(CreateValidator)

    const competition = await Database.transaction(async () => {
      let comp: Competition = await Competition.create(payload)

      const file: MultipartFileContract | null = request.file('image')
      if (file) {
        await this.uploadFile(file, comp.id)
        await Competition.query()
          .where('id', comp.id)
          .update({ image: `competition/${comp.id}.${file.extname}` })

        comp = await Competition.findOrFail(comp.id)
      }
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

    if (request.qs().relationships) {
      query = this.preloadRelations(request.qs(), query)
    }

    const competition = await query.firstOrFail()

    return response.status(200).json({
      ...competition.serialize(),
      users: this.attachPivotColumnsIntoRelationship(competition, 'users'),
    })
  }

  public async update ({ request, response }: HttpContextContract) {
    const { image, schedules, ...payload } = await request.validate(UpdateValidator)
    const file: MultipartFileContract | null = request.file('image')
    console.log('file :>> ', file);

    const competition = await Database.transaction(async () => {
      if (file) {
        await this.uploadFile(file, request.param('id'))
      }

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
    return response.status(200).json({
      ...competition.serialize(),
      users: this.attachPivotColumnsIntoRelationship(competition, 'users'),
    })
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
