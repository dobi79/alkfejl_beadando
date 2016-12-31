'use strict'

const Household = use('App/Model/Household')
const User = use('App/Model/User')
const Budget = use('App/Model/Budget')
const Hash = use('Hash')
const Validator = use('Validator')

class UserController {
    * show(req,res) {
        yield res.sendView('main');
    }

    * login(req,res){
        try{
            const post = req.post();
            yield req.auth.attempt(post.username, post.password);
            const user = yield User.findBy('username', post.username);
            res.redirect('/home');
        }catch(e){
            yield req
            .withOut('password')
            .andWith({errors : [{
                message: 'Bad certification'
            }]}).flash()

            res.redirect('back')
            return
        }
       
    }

    * list(req, res) {
        const households = yield Household.all();
        const users = yield User.all();
        const budgets = yield Budget.all();
            yield res.sendView('home', {
            households: households.toJSON(),
            users: users.toJSON(),
            budgets: budgets.toJSON(),
            });
    }

    * registration(req,res) {
        const households = yield Household.all();
        yield res.sendView('registration', {
            households: households.toJSON(),
        });
    }

    *subRegistration(req, res) {
        var post = req.post();
        var userData = {
            username:post.username,
            lastname:post.lastname,
            firstname:post.firstname,
            email:post.email,
            household_id: post.household_id,
            password:post.password,
            password2:post.password2
        };

        const validation = yield Validator.validateAll(userData, User.rules)

         if (validation.fails()) {
             yield req
                .withOut('password','password2')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
         }

        delete userData.password2;
        userData.password = yield Hash.make(userData.password);

        var user = yield User.create(userData);
        yield user.save();

        req.auth.login(user);

        res.redirect('/')
    }

    * logout(req, res) {
        yield req.auth.logout();
        res.redirect('/');
    }

    * householdReg(req, res) {
        yield res.sendView('addressReg');
    }

    * householdSub(req, res) {
        var post = req.post();
        var householdData = {
           zip_code: post.zip_code,
           city: post.city,
           street: post.street,
           number: post.number,
        };

        const validation = yield Validator.validateAll(householdData, Household.rules)

         if (validation.fails()) {
             yield req
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
         }


        var household = yield Household.create(householdData);
        yield household.save();

        res.redirect('/registration')
    }

    * newbudget(req,res) {
        yield res.sendView('newbudget');
    }

    * subBudget(req, res) {
        const post = req.post();
        var user = yield User.findBy('id', req.param('id'));
        var budgetData = {
           user_id: user.id,
           address_id: user.household_id,
           comment: post.comment,
           money: post.money,
        };

        const validation = yield Validator.validateAll(budgetData, Budget.rules)

         if (validation.fails()) {
             yield req
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
         }
        
        var budget = yield Budget.create(budgetData);
        yield budget.save();

        res.redirect('/home')
    }

    * listbudgets(req, res) {
        const budgets = yield Budget.all();
        yield res.sendView('showbudgets', {
            budgets: budgets.toJSON(),
        });
    }

    * showEditBudget(req, res) {
        const budgets = yield Budget.findBy('id', req.param('id'));
        yield res.sendView('editbudgets', {
            budgets: budgets.toJSON(),
        });
    }

    * editBudget(req, res) {
        var post = req.post();
        const budget = yield Budget.findBy('id', req.param('id'));

        budget.comment = post.comment;
        budget.money = post.money;

        yield budget.save();
        res.redirect('/showbudgets');
    }

    * deleteBudget(req, res) {
        var budget = yield Budget.findBy('id', req.param('id'));
        yield budget.delete();
        res.redirect('/showbudgets');
    }

    * editUser(req, res) {
       yield res.sendView('editUser')
    }

    * subEditUser(req, res) {
        var post = req.post();
        var user = yield User.findBy('id', req.param('id'));

        user.lastname = post.lastname;
        user.firstname = post.firstname;
        user.email = post.email;

        yield user.save();
        res.redirect('/home');
    }

    * showChangePass(req, res) {
        yield res.sendView('changePassword');
    }

    * changePass(req, res) {
        var post = req.post();
        var user = yield User.findBy('id', req.param('id'));
        var userData = {
            password:post.password,
            password2:post.password2
        };

        const validation = yield Validator.validateAll(userData, User.pass_changeRules)

         if (validation.fails()) {
             yield req
                .withOut('password','password2')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
         }

        delete userData.password2;
        user.password = yield Hash.make(userData.password);
        yield user.save();

        yield res.redirect('/home');
    }

    * ajaxDeleteBudget(req, res) {
        var budget = yield Budget.findBy('id', req.param('id'));
        yield budget.delete();

        yield res.ok({
            message:'OK!'
        });
    }
}

module.exports = UserController