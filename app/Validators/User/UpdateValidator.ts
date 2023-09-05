import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor (protected ctx: HttpContextContract) {}
  public refs = schema.refs({
    id: this.ctx.params.id,
  })

  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
    email: schema.string({}, [
      rules.email(),
      // rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string.optional({}, [
      rules.confirmed('password_confirm'),
      rules.maxLength(64),
      rules.minLength(8),
    ]),
    phone: schema.string.optional({}, [
      rules.unique({ table: 'users', column: 'phone', whereNot: { id: this.refs.id } }),

    ]),
    state: schema.string(),
    country: schema.string(),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'email.unique': 'Email is already taken',
    'password_confirmation.confirmed': 'Password confirmation does not match',
    'phone.unique': 'Phone number is already taken',
    'image': 'MaxSize: 2MB, Allowed extensions: jpg, png, jpeg, webp',
  }
}
