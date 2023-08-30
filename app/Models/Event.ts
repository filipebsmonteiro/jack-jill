import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import EventRegistration from 'App/Models/EventRegistration'
import User from 'App/Models/User'
import Competition from 'App/Models/Competition'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public location: string

  @column()
  public type: string

  @column()
  public status: string

  @column()
  public image: string

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
  @hasMany(() => EventRegistration)
  public registrations: HasMany<typeof EventRegistration>

  @manyToMany(() => User, { pivotTable: 'users_events' })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Competition, { pivotTable: 'events_competitions' })
  public competitions: ManyToMany<typeof Competition>
}
