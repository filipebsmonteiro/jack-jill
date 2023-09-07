import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor (protected ctx: HttpContextContract) {}
  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    name: schema.string(),
    type: schema.enum(['combat', 'sortition'] as const),
  })

  public messages: CustomMessages = {
    // 'email.unique': 'Email is already taken',
  }
}
