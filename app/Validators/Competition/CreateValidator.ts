import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    description: schema.string(),
    image: schema.file({
      size: '3mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    }),
    type: schema.enum(['combat', 'sortition'] as const),
    schedules: schema.array
      .optional([ rules.minLength(1) ])
      .members(
        schema.object().members({
          name: schema.string(),
          start_date: schema.date(),
          end_date: schema.date(),
        })
      ),
  })

  public messages: CustomMessages = {
    // 'email.unique': 'Email is already taken',
  }
}
