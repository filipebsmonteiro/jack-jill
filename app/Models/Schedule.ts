import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime()
  public dayHour: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
  * Relationships
  */
  // @manyToMany(() => User, { pivotTable: 'users_competitions' })
  // public competitors: ManyToMany<typeof User>

  /**
   * Hooks
   */
  @beforeCreate()
  public static async createUUID (schedule: Schedule) {
    schedule.id = uuid().toString()
  }
}
