import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Hooks
   */
  @beforeCreate()
  public static async createUUID (schedule: Schedule) {
    schedule.id = uuid().toString()
  }
}
