'use strict'

const Lucid = use('Lucid')

class Household extends Lucid {
    static get rules () {
        return {
            zip_code: 'required',
            city: 'required',
            street: 'required',
            number: 'required',
        }
    }

users () {
    return this.hasMany('App/Model/User')
  }

}


module.exports = Household
