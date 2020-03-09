// Load the module dependencies
const Comment = require('mongoose').model('Comment');
const Student = require('mongoose').model('Student');

// Create a new controller method that renders the comment page
exports.renderComment = function (req, res) {
    // If user is not connected redirect the user back to the main application page, otherwise render comment page
    if (!req.user) {
        return res.redirect('/');
    } else {
        // Use the 'response' object to render the comment page
        res.render('comment', {
            // Set the page title variable
            title: 'Comment Form - myPortal',
            // Set the email variable
            email: req.user ? req.user.email : '',
            // Set the flash message variable
            messages: req.flash('error') || req.flash('info')
        });
    }
};


// 'addComment' controller method to add a new comment
exports.addComment = function (req, res) {
    // Create a new instance of the 'Comment' Mongoose model
    let comment = new Comment(req.body);

    // Set the comment student property
    comment.student = req.user._id;

    // Use the 'Comment' instance's 'save' method to save a new comment document
    comment.save((err) => {
        if (err) {
            // Save the error into flash memory
            req.flash('error', message);

            // Redirect the user back to the comment page
            return res.redirect('/comment');
        } else {
            // Redirect the user to the thankyou page with custom url with email param
            return res.redirect('/thankyou?email=' + req.user.email);
        }
    });
};

// Create a new controller method that renders the thank you page
exports.renderThankyou = function (req, res) {
    // get email param
    let email = req.param('email');

    // If user is not connected redirect the user back to the main application page, otherwise render the thankyou page
    if (!req.user) {
        return res.redirect('/');
    } else {
        // Use the 'response' object to render the thankyou page
        res.render('thankyou', {
            // Set the page title variable
            title: 'Thank You',
            // Set the email variable
            email: email
        });
    }
};

// Create a new controller method that renders the comment list page
exports.renderCommentList = function (req, res, next) {
    let email = req.param('email');

    // Use the 'Student' static 'findOne' method to retrieve a specific student
    Student.findOne({
        // using the email to find a student
        email: email
    }, (err, student) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'studentId' property
            let studentId = student._id;

            // Use the 'Comment' static 'find' method to retrieve the list of comments with a specific studentId
            Comment.find({
                student: studentId
            }, (err, comments) => {
                if (err) {
                    // Call the next middleware with an error message
                    return next(err);
                } else {
                    // Use the 'response' object to render the commentlist page
                    res.render('commentlist', {
                        // Set the page title variable
                        title: 'List of Comments - myPortal',
                        // Set email variable
                        email: email,
                        // Set all comments
                        comments: comments
                    });
                }
            });
        }
    });
};