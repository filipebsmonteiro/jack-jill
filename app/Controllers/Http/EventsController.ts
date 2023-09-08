import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
import Event from 'App/Models/Event'
import CreateValidator from 'App/Validators/Event/CreateValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'
import Schedule from 'App/Models/Schedule'
import Database from '@ioc:Adonis/Lucid/Database'

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

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const trx = payload.schedules.length ? await Database.transaction() : undefined

    const { image, ...data } = payload
    let event = await Event.create(data, { client: trx })

    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await this.uploadFile(file, event.id)
      await Event.query().where('id', event.id)
        .update({ image: `event/${event.id}.${file.extname}` })

      event = await Event.query().where('id', event.id)
        .firstOrFail()
    }

    if (payload.schedules.length) {
      await Database.transaction(async (trx) => {
        const schedules = await Promise.all(
          payload.schedules.map(async (schedule) => {
            return await Schedule.create(schedule, { client: trx })
          })
        ).then((schedules) => schedules.map((schedule) => schedule.id))

        event.related('schedules').attach(schedules)
      })
    }

    if (trx) {
      await trx.commit()
    }

    return response.status(201).json(event.serialize())
  }

  public async show ({ request, response }: HttpContextContract) {
    const event = await Event.query()
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
