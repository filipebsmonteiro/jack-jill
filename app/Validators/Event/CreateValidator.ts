import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    location: schema.string(),
    type: schema.string(),
    status: schema.enum(['draft', 'published', 'canceled'] as const),
    image: schema.file({
      size: '3mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    }),
    start_date: schema.date(),
    end_date: schema.date(),

    schedules: schema.array().members(
      schema.object().members({
        name: schema.string(),
        start_date: schema.date(),
        end_date: schema.date(),
      })
    ),
  })

  public messages: CustomMessages = {
    // 'file': 'File maxSize: 3MB, extensions allowed: jpg, jpeg, png, webp',
  }
}
