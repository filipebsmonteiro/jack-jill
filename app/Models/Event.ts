import { DateTime } from 'luxon'
import { BaseModel, HasMany, ManyToMany, beforeCreate, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import EventRegistration from 'App/Models/EventRegistration'
import User from 'App/Models/User'
import Competition from 'App/Models/Competition'
import Schedule from 'App/Models/Schedule'

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

  @column.dateTime({ serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd') })
  public start_date: DateTime

  @column.dateTime({ serialize: (value: DateTime) => value.toFormat('yyyy-MM-dd') })
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

  @manyToMany(() => Schedule, { pivotTable: 'event_schedules' })
  public schedules: ManyToMany<typeof Schedule>

  /**
   * Hooks
   */
  @beforeCreate()
  public static async createUUID (user: User) {
    user.id = uuid().toString()
  }
}
