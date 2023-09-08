import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateValidator {
  constructor (protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    first_name: schema.string(),
    last_name: schema.string(),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.confirmed('password_confirm'),
      rules.minLength(8),
      rules.maxLength(64),
    ]),
    phone: schema.string({}, [
      // rules.mobile({ strict: true }),
      rules.mobile({
        // locale: ['pt-BR', 'en-IN', 'en-US'],
      }),
      rules.unique({ table: 'users', column: 'phone' }),
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
