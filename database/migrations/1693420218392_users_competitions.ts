import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users_competitions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users')
      table.uuid('competition_id').references('id').inTable('competitions')
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.double('score').defaultTo(0)

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
