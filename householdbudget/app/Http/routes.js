'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/','UserController.show');
Route.post('/', 'UserController.login');
Route.get('/home', 'UserController.list').middleware('auth');
Route.get('/registration', 'UserController.registration');
Route.post('/registration', 'UserController.subRegistration');
Route.get('/logout', 'UserController.logout');
Route.get('/addressReg', 'UserController.householdReg');
Route.post('/addressReg', 'UserController.householdSub');
Route.get('/newbudget/:id', 'UserController.newbudget').middleware('auth');
Route.post('/newbudget/:id', 'UserController.subBudget').middleware('auth');
Route.get('/showbudgets', 'UserController.listbudgets').middleware('auth');
Route.get('/editbudgets/:id', 'UserController.showEditBudget').middleware('auth');
Route.post('/editbudgets/:id', 'UserController.editBudget').middleware('auth');
Route.post('/delete/:id', 'UserController.deleteBudget').middleware('auth');
Route.get('/editUser/:id', 'UserController.editUser').middleware('auth');
Route.post('/editUser/:id', 'UserController.subEditUser').middleware('auth');
Route.get('/changePassword/:id', 'UserController.showChangePass').middleware('auth');
Route.post('/changePassword/:id', 'UserController.changePass').middleware('auth');

Route.get('/changeUser/:id', 'AdminController.changeUser').middleware('auth');
Route.post('/changeUser/:id', 'AdminController.subChangeUser').middleware('auth');
Route.post('/changeUser/:id/delete', 'AdminController.deleteUser').middleware('auth');
Route.get('/listHouseholds', 'AdminController.listHouseholds').middleware('auth');
Route.get('/editAddress/:id', 'AdminController.editAddress').middleware('auth');
Route.post('/editAddress/:id', 'AdminController.subEditAddress').middleware('auth');
Route.post('/deleteAdm/:id', 'AdminController.deleteAddress').middleware('auth');

Route.group('ajax', function(){
    Route.delete('/delete/:id', 'UserController.ajaxDeleteBudget')
    Route.delete('/deleteAdm/:id', 'AdminController.ajaxDeleteHousehold')
    Route.delete('/changeUser/:id/delete', 'AdminController.ajaxDeleteUser')
}).prefix('/ajax');