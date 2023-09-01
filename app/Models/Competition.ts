import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, beforeCreate, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v5 as uuid } from 'uuid'
import User from 'App/Models/User'
import Event from 'App/Models/Event'

export default class Competition extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
  * Relationships
  */
  @hasOne(() => Event)
  public event: HasOne<typeof Event>

  @manyToMany(() => User, { pivotTable: 'users_competitions' })
  public competitors: ManyToMany<typeof User>

  @manyToMany(() => User, { pivotTable: 'judges_competitions' })
  public judges: ManyToMany<typeof User>

  /**
   * Hooks
   */
  @beforeCreate()
  public static async createUUID (user: User) {
    user.id = uuid().toString()
  }
}
