import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Event from 'App/Models/Event'

export default class EventRegistration extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public event_id: string

  @column()
  public name: string

  @column()
  public price: number

  @column.date()
  public start_date: DateTime

  @column.date()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
  * Relationships
  */
  @hasOne(() => Event)
  public event: HasOne<typeof Event>
}
