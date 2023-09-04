import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor (protected ctx: HttpContextContract) {}
  public refs = schema.refs({
    id: this.ctx.params.id,
  })

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
    // phone: schema.string.optional({}, [
    //   rules.unique({ table: 'users', column: 'phone', whereNot: { id: this.refs.id } }),
    // ]),
  })

  public messages: CustomMessages = {
    'file': 'File maxSize: 3MB, extensions allowed: jpg, jpeg, png, webp',
  }
}