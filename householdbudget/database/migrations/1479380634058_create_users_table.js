'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
      this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('firstname', 254).notNullable()
      table.string('lastname', 254).notNullable()
      table.integer('household_id').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
