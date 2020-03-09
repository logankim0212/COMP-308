exports.render = function (req, res) {
    //make a reference to the session object
    var session = req.session;
    var comments = req.body.comments;
    session.comments = comments;

    //check if username or comments is stored in session object
    if (session.username && session.comments) {
        console.log("user's comment: " + session.comments);
        res.redirect('/thankyou');
    } else if (session.username) {
        res.render('comments', {
            title: 'Comments',
            username: session.username
        });
    } else {
        res.redirect('/');
    }
};