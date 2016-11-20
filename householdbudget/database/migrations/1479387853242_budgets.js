'use strict'

const Schema = use('Schema')

class BudgetsTableSchema extends Schema {

  up () {
    this.create('budgets', (table) => {
      table.increments()
      table.integer('user_id').notNullable()
      table.integer('address_id').notNullable()
      table.string('comment').notNullable()
      table.integer('money')
      table.timestamps()
    })
  }

  down () {
      this.drop('budgets')
  }

}

module.exports = BudgetsTableSchema
