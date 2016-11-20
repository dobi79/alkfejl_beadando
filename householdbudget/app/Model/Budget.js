'use strict'

const Lucid = use('Lucid')

class Budget extends Lucid {
    static get rules () {
        return {
            user_id: 'required',
            address_id: 'required',
            comment: 'required',
            money: 'required',
        }
    }

    users() {
        return this.hasMany('App\Model\User')
    }
}

module.exports = Budget
