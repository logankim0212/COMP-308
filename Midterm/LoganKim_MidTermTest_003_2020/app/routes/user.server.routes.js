//load the controllers
const index = require('../controllers/index.server.controller');
const users = require('../controllers/user.server.controller');
const passport = require('passport');

module.exports = function (app) {
    // Set up the 'index' 
    app.get('/', index.render);

    // Set up the 'login' routes 
    app.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    // Set up the 'register' routes 
    app.route('/register')
        .get(users.renderRegister)
		.post(users.register);
		
    // Set up the 'logout' 
    app.get('/logout', users.logout);

    // Set up the 'userlist' 
    app.get('/userlist', users.renderUserList);
};