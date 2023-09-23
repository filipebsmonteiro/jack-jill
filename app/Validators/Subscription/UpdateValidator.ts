import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    status: schema.enum(['pending', 'approved', 'rejected']),

    eventId: schema.string.optional([
      rules.requiredIfNotExists('competitionId'),
    ]),

    competitionId: schema.string.optional([
      rules.requiredIfNotExists('eventId'),
    ]),

  })

  public messages: CustomMessages = {
    // 'file': 'File maxSize: 3MB, extensions allowed: jpg, jpeg, png, webp',
  }
}
