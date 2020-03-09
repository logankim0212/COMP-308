exports.render = function (req, res) {
    var username = req.body.username;
    if (username) {
        res.redirect('/login');
    } else {
        //display the ejs page
        res.render('index', {
            title: 'Log in'
        });
    }
};