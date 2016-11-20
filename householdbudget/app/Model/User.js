'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static get rules() {
      return{
        username: 'required|unique:users',
        lastname: 'required',
        firstname: 'required',
        email: 'required|email|unique:users',
        household_id: 'required',
        password: 'required',
        password2: 'required|same:password'
      }
  }

  static get pass_changeRules() {
    return{
        password: 'required',
        password2: 'required|same:password'
    }
  }

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  household () {
    return this.belongsTo('App/Model/Household')
  }

}

module.exports = User
