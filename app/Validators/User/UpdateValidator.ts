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
    // 'first_name.required': 'First name is required',
    // 'last_name.required': 'Last name is required',
    // 'email.required': 'Email is required',
    'email.unique': 'Email is already taken',
    // 'password.required': 'Password is required',
    // 'password.minLength': 'Password must be at least 8 characters',
    // 'password.maxLength': 'Password must be at most 64 characters',
    // 'password_confirmation.required': 'Password confirmation is required',
    'password_confirmation.confirmed': 'Password confirmation does not match',
    // 'phone.required': 'Phone number is required',
    'phone.unique': 'Phone number is already taken',
    // 'city.required': 'City is required',
    // 'state.required': 'State is required',
    // 'country.required': 'Country is required',
  }
}
