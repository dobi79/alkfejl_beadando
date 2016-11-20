'use strict'

const Schema = use('Schema')

class HouseholdsTableSchema extends Schema {

  up () {
    this.create('households', (table) => {
      table.increments()
      table.integer('zip_code')
      table.string('city').notNullable()
      table.string('street').notNullable()
      table.integer('number')
      table.timestamps()
    })
  }

  down () {
      this.drop('households')
  }

}

module.exports = HouseholdsTableSchema
