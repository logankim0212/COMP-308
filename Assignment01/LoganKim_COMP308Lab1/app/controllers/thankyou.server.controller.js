exports.render = function (req, res) {
    //make a reference to the session object
    var session = req.session;
    //check if username is stored in session object
    if (session.username && session.comments) {
        res.render('thankyou', {
            title: 'Thank You',
            username: session.username,
            comments: session.comments
        });
    } else if (session.username) {
        res.redirect('/comments');
    } else {
        res.redirect('/');
    }
};