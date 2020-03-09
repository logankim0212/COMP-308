exports.render = function (req, res) {
    var session = req.session;
    session.username = req.body.username;
    console.log("username in session: " + session.username);
    res.redirect('/comments');
};