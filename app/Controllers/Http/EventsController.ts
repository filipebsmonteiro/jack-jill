import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
import Event from 'App/Models/Event'
import CreateValidator from 'App/Validators/Event/CreateValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'
import Schedule from 'App/Models/Schedule'
import Database from '@ioc:Adonis/Lucid/Database'
import { all } from 'proxy-addr'

export default class EventsController {
  private async uploadFile (file: MultipartFileContract, id: string) {
    await file.move(Application.tmpPath('uploads/event'), {
      name: `${id}.${file.extname}`,
      overwrite: true,
    })
  }

  public async index ({ response }: HttpContextContract) {
    const events = await Event.query()
      .withCount('users')
    return response.status(200).json(events)
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const { image, ...data } = payload

    const event = await Database.transaction(async () => {
      let evt = await Event.create(data)

      const file: MultipartFileContract | null = request.file('image')
      if (file) {
        await this.uploadFile(file, evt.id)
        await Event.query()
          .where('id', evt.id)
          .update({ image: `event/${evt.id}.${file.extname}` })

        evt = await Event.query().where('id', evt.id)
          .firstOrFail()
      }

      if (payload.schedules) {
        const schedules = await Promise.all(
          payload.schedules.map(async (schedule) => await Schedule.create(schedule))
        ).then((schedules) => schedules.map((schedule) => schedule.id))

        evt.related('schedules').attach(schedules)
      }

      return evt
    })

    return response.status(201).json(event.serialize())
  }

  public async show ({ request, response }: HttpContextContract) {
    const event = await Event.query()
      .preload('schedules')
      .where('id', request.param('id'))
      .firstOrFail()
    return response.status(200).json(event.serialize())
  }

  public async update ({ request, response }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)
    const file: MultipartFileContract | null = request.file('image')
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

    const event = await Event.query()
      .where('id', request.param('id'))
      .firstOrFail()
    return response.status(200).json(event.serialize())
  }

  public async destroy ({ request }: HttpContextContract) {
    const event = await Event.query()
      .where('id', request.param('id'))
      .firstOrFail()
    event.delete()
    return true
  }
}
