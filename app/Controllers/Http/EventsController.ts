import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
import Event from 'App/Models/Event'
import CreateValidator from 'App/Validators/Event/CreateValidator'
import UpdateValidator from 'App/Validators/Event/UpdateValidator'

export default class EventsController {
  public async index ({}: HttpContextContract) {
    const events = await Event.query()
    return events
  }

  public async store ({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateValidator)
    const { image, ...data } = payload
    let event: any = await Event.create(data)

    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await file.move(Application.tmpPath('uploads/event'), {
        name: `${event.id}.${file.extname}`,
        overwrite: true,
      })
      event = await Event.query()
        .where('id', event.id)
        .update({ image: `event/${event.id}.${file.extname}` })
    }

    return response.status(201).json({ event })
  }

  public async show ({ request }: HttpContextContract) {
    const event = await Event.query()
      .where('id', request.param('id'))
      .firstOrFail()
    return event
  }

  public async update ({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateValidator)
    const file: MultipartFileContract | null = request.file('image')
    if (file) {
      await file.move(Application.tmpPath('uploads/event'), {
        name: `${request.param('id')}.${file.extname}`,
        overwrite: true,
      })
    }

    const event = await Event.query()
      .where('id', request.param('id'))
      .update({
        ...payload,
        start_date: payload.start_date.toFormat('yyyy-MM-dd') || undefined,
        end_date: payload.start_date.toFormat('yyyy-MM-dd') || undefined,
        image: file ? `event/${request.input('id')}.${file.extname}` : undefined,
      })
    return event
  }

  public async destroy ({ request }: HttpContextContract) {
    const event = await Event.query()
      .where('id', request.param('id'))
      .firstOrFail()
    event.delete()
    return true
  }
}
