import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Event from 'App/Models/Event'

export default class UsersEvents extends BaseModel {
  @column()
  public user_id: string

  @column()
  public event_id: number

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @hasOne(() => Event)
  public event: HasOne<typeof Event>
}
