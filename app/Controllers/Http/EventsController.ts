import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import Event from 'App/Models/Event'
import CreateValidator from 'App/Validators/Event/CreateValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'
import SubscribeValidator from 'App/Validators/Event/SubscribeValidator'
import Schedule from 'App/Models/Schedule'

export default class EventsController {
  private async uploadFile (file: MultipartFileContract, id: string) {
    await file.move(Application.tmpPath('uploads/event'), {
      name: `${id}.${file.extname}`,
      overwrite: true,
    })
  }

  public async index ({ response }: HttpContextContract) {
    const events = await Event.query()
    return response.status(200).json(events)
  }

  public async resume ({ response }: HttpContextContract) {
    let events = await Event.query()
      .select('name', 'image', 'start_date', 'end_date')
      .withCount('users', (builder) => {
        builder.wherePivot('status', 'approved')
      })
      .limit(10)
      .orderBy('created_at', 'desc')
      .then(response => response.map((event) => ({
        ...event.toJSON(),
        users: event.$extras.users_count,
      })))

    return response.status(200).json(events)
  }

  public async store ({ request, response }: HttpContextContract) {
    const { image, schedules, ...payload } = await request.validate(CreateValidator)

    const event = await Database.transaction(async () => {
      let evt = await Event.create(payload)

      const file: MultipartFileContract | null = request.file('image')
      if (file) {
        await this.uploadFile(file, evt.id)
        await Event.query()
          .where('id', evt.id)
          .update({ image: `event/${evt.id}.${file.extname}` })

        evt = await Event.findOrFail(evt.id)
      }

      if (schedules) {
        const schedulesIds = await Promise.all(
          schedules.map(async (schedule) => await Schedule.create(schedule))
        ).then((schedules) => schedules.map((schedule) => schedule.id))

        evt.related('schedules').attach(schedulesIds)
      }

      return evt
    })

    return response.status(201).json(event.serialize())
  }

  public async show ({ request, response }: HttpContextContract) {
    const event = await Event.query()
      .preload('schedules', (builder) => {
        builder.orderBy('start_date')
      })
      .where('id', request.param('id'))
      .firstOrFail()
    return response.status(200).json(event.serialize())
  }

  public async update ({ request, response }: HttpContextContract) {
    const { image, schedules, ...payload } = await request.validate(UpdateValidator)
    const file: MultipartFileContract | null = request.file('image')

    const event = await Database.transaction(async () => {
      if (file) {
        await this.uploadFile(file, request.param('id'))
      }

      await Event.query()
        .where('id', request.param('id'))
        .update({
          ...payload,
          start_date: payload.start_date.toFormat('yyyy-MM-dd') || undefined,
          end_date: payload.start_date.toFormat('yyyy-MM-dd') || undefined,
          image: file ? `event/${request.input('id')}.${file.extname}` : undefined,
        })

      const evt = await Event.findOrFail(request.param('id'))

      if (schedules) {
        const schedulesIds = await Promise.all(
          schedules.map(async ({ id = undefined, ...schedule }) => {
            return await Schedule.updateOrCreate({ id }, schedule)
          })
        ).then((schedules) => schedules.map((schedule) => schedule.id))

        evt.related('schedules').sync(schedulesIds)
      }

      return evt
    })

    return response.status(200).json(event.serialize())
  }

  public async destroy ({ request }: HttpContextContract) {
    const event = await Event.query()
      .where('id', request.param('id'))
      .firstOrFail()
    event.delete()
    return true
  }

  public async autocomplete ({ request, response }: HttpContextContract) {
    const users = await Event.query()
      .where('name', 'like', `%${request.input('name')}%`)
      .limit(10)
    return response.status(200).json(users.map((user) => user.serialize()))
  }

  public async loadSubscribes ({ request, response }: HttpContextContract) {
    let query = Event.query().preload('users', builder => {
      builder.select('id', 'first_name', 'last_name', 'country')
    })

    Object.entries(request.qs()).map(([column, value]) => query = query.where(column, value))

    const event = await query.firstOrFail()
    const users = event.users.map((user) =>
      ({...user.toJSON(), status: user.$extras.pivot_status})
    )

    return response.status(200).json({
      ...event.serialize(),
      users,
    })
  }

  public async subscribe ({ request, response }: HttpContextContract) {
    const { id, userId } = await request.validate(SubscribeValidator)
    let event = await Event.findOrFail(id)
    await event.related('users').attach([userId])

    event = await Event.query()
      .preload('users', query => {
        query.select('id', 'first_name', 'last_name', 'country')
          .wherePivot('user_id', userId)
      })
      .where('id', id)
      .firstOrFail()

    const users = event.users.map((user) =>
      ({...user.toJSON(), status: user.$extras.pivot_status})
    )

    return response.status(200).json({
      ...event.serialize(),
      users,
    })
  }

  public async unsubscribe ({ request, response }: HttpContextContract) {
    const { id, userId } = await request.validate(SubscribeValidator)
    const event = await Event.findOrFail(id)
    await event.related('users').detach([userId])
    return response.status(200).json(event.serialize())
  }
}
