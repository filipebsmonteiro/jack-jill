import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DeleteValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    competitionId: schema.string(),
    levelId: schema.string(),
    round: schema.string(),
  })

  public messages: CustomMessages = {
    // 'email.unique': 'Email is already taken',
  }
}
