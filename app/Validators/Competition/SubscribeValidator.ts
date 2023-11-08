import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SubscribeValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string(),
    userId: schema.string(),
    level_id: schema.string.optional(),
    role: schema.string.optional(),

    // schedules: schema.array
    //   .optional([ rules.minLength(1) ])
    //   .members(
    //     schema.object().members({
    //       name: schema.string(),
    //       start_date: schema.date(),
    //       end_date: schema.date(),
    //     })
    //   ),
  })

  public messages: CustomMessages = {
    // 'file': 'File maxSize: 3MB, extensions allowed: jpg, jpeg, png, webp',
  }
}
