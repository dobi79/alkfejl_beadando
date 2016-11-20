'use strict'

const User = use('App/Model/User');
const Budget = use('App/Model/Budget');
const Household = use('App/Model/Household');

class AdminController {
    * changeUser(req, res){
        var user = yield User.findBy('id', req.param('id'));
        yield res.sendView('changeUser', {
            user: user.toJSON(),
        });
    }

    * subChangeUser(req, res) {
        const post = req.post();
        var user = yield User.findBy('id', req.param('id'));

        user.username = post.username;
        user.firstname = post.firstname;
        user.lastname = post.lastname;
        user.email = post.email;

        yield user.save();
        res.redirect('/home');
    }

    * deleteUser(req, res) {
        var user = yield User.findBy('id', req.param('id'));
        var budgets = yield Budget.query().where('user_id', user.id);
        for( var i = 0; i < budgets.length; ++i){
            var budget = yield Budget.findBy('id', budgets[i].id);
            yield budget.delete();
        }
        yield user.delete();
        res.redirect('/home');
    }

    * listHouseholds(req, res) {
        var households = yield Household.all();
        yield res.sendView('listHouseholds', {
            households: households.toJSON(),
        });
    }

    * editAddress(req, res) {
        var address = yield Household.findBy('id', req.param('id'));
        yield res.sendView('editAddress', {
            address: address.toJSON(),
        });
    }

    * subEditAddress(req, res){
        var post = req.post();
        var address = yield Household.findBy('id', req.param('id'));

        address.zip_code = post.zip_code;
        address.city = post.city;
        address.street = post.street;
        address.number = post.number;

        yield address.save();
        res.redirect('/listHouseholds');
    }

    * deleteAddress(req, res){
        var address = yield Household.findBy('id', req.param('id'));
        var budgets = yield Budget.query().where('address_id', address.id);
        var users = yield User.query().where('household_id', address.id);

        for(var i = 0; i < budgets.length; ++i){
            var budget = yield Budget.findBy('id', budgets[i].id);
            yield budget.delete();
        }

        for(var j = 0; j < users.length; ++j){
            var user = yield User.findBy('id', users[j].id);
            yield user.delete();
        }

        yield address.delete();
        res.redirect('/listHouseholds');
    }
}

module.exports = AdminController
