module.exports = function (app) {
    //load the controllers
    var index = require('../controllers/index.server.controller');
    var login = require('../controllers/login.server.controller');
    var logout = require('../controllers/logout.server.controller');
    var comments = require('../controllers/comments.server.controller');
    var thankyou = require('../controllers/thankyou.server.controller');

    app.route('/').get(index.render).post(login.render);
    app.route('/comments').get(comments.render).post(comments.render);
    app.get('/thankyou', thankyou.render);
    app.get('/logout', logout.render);
};