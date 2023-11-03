import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Competition from 'App/Models/Competition'
import User from 'App/Models/User'

export default class CompetitionScore extends BaseModel {
  @column({ isPrimary: true })
  public competition_id: string

  @column({ isPrimary: true })
  public competitor_id: string

  @column()
  public judge_id: string

  @column()
  public score: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Competition)
  public competition: HasOne<typeof Competition>

  @hasOne(() => User)
  public competitor: HasOne<typeof User>

  @hasOne(() => User)
  public judge: HasOne<typeof User>

  /**
   * Hooks
   */
}
