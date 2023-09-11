import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'event_schedules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE')
      table.uuid('schedule_id').references('id').inTable('schedules')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
