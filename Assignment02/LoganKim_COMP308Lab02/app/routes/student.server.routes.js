//load the controllers
const index = require('../controllers/index.server.controller');
const students = require('../controllers/student.server.controller');
const passport = require('passport');

module.exports = function (app) {
    // Set up the 'index' 
    app.get('/', index.render);

    // Set up the 'login' routes 
    app.route('/login')
        .get(students.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    // Set up the 'register' routes 
    app.route('/register')
        .get(students.renderRegister)
        .post(students.register);

    // Set up the 'logout' 
    app.get('/logout', students.logout);

    // Set up the 'studentlist' 
    app.get('/studentlist', students.renderStudentList);
};