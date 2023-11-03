import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'competition_scores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('competition_id').references('id').inTable('competitions')
      table.uuid('competitor_id').references('id').inTable('users')
      table.uuid('judge_id').references('id').inTable('users')
      table.double('score').defaultTo(0)
      table.string('round')

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
