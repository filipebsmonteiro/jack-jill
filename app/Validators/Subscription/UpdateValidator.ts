import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    score: schema.number.optional(),
    status: schema.enum.optional(['pending', 'approved', 'rejected']),

    eventId: schema.string.optional([
      rules.requiredIfNotExists('competitionId'),
    ]),

    competitionId: schema.string.optional([
      rules.requiredIfNotExists('eventId'),
      rules.requiredIfExists('score'),
    ]),

  })

  public messages: CustomMessages = {
    // 'file': 'File maxSize: 3MB, extensions allowed: jpg, jpeg, png, webp',
  }
}
