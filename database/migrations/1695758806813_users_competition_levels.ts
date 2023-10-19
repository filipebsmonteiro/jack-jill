import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users_competition_levels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users')
      table.uuid('level_id').references('id').inTable('competition_levels')
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
