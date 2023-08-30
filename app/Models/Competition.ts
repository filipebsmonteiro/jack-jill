import { DateTime } from 'luxon'
import { BaseModel, HasManyThrough, HasOne, ManyToMany, column, hasManyThrough, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import UsersCompetitions from 'App/Models/ManyToMany/UsersCompetitions'
import User from 'App/Models/User'
import Event from 'App/Models/Event'
import JudgesCompetitions from './ManyToMany/JudgesCompetitions'

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
}
