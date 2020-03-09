exports.render = function (req, res) {
    //destroy the session and redirect user to root path
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
};