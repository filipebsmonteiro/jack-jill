import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users_competitions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('competition_id').references('id').inTable('competitions').onDelete('CASCADE')
      table.uuid('level_id').references('id').inTable('competition_levels')
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table.enum('role', ['leader', 'follower', 'judge'])
      table.string('judge_description')

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
