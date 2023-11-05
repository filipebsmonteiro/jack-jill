import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'competition_scores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('competition_id').references('id').inTable('competitions').onDelete('CASCADE')
      table.uuid('competitor_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('judge_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('level_id').references('id').inTable('competition_levels')
      table.double('score').defaultTo(0)
      table.string('round').defaultTo(0)

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
