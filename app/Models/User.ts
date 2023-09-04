import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, beforeCreate, beforeSave, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuid } from 'uuid'
import Event from 'App/Models/Event'
import Competition from 'App/Models/Competition'

export default class User extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public country: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @column.dateTime({ columnName: 'customDeletedAtColumn' })
  @column.dateTime({ columnName: 'deleted_at' })
  public deletedAt: DateTime | null

  /**
  * Relationships
  */
  @manyToMany(() => Event, { pivotTable: 'users_events' })
  public events: ManyToMany<typeof Event>

  @manyToMany(() => Competition, { pivotTable: 'users_competitions' })
  public competitions: ManyToMany<typeof Competition>

  /**
   * Hooks
   */
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async createUUID (user: User) {
    user.id = uuid().toString()
  }
}
