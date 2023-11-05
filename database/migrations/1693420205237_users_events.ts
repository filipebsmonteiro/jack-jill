import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users_events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('event_id').references('id').inTable('events').onDelete('CASCADE')
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')

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
