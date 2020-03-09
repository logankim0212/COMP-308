// Load the module dependencies
const Student = require('mongoose').model('Student');

// Create a new error handling controller method
let getErrorMessage = function (err) {
    // Define the error message variable
    let message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
                // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    // Return the message error
    return message;
};

// Create a new controller method that renders the register page
exports.renderRegister = function (req, res) {
    // If user is not connected render the register page, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Use the 'response' object to render the register page
        res.render('register', {
            // Set the page title variable
            title: 'Register Form - myPortal',
            // Read the message from flash variable
            message: req.flash('error') // Passes the error stored in flash
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that creates new students
exports.register = function (req, res, next) {
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Create a new 'Student' model instance
        let student = new Student(req.body);
        let message = null;

        // Set the student provider property
        student.provider = 'local';

        // Try saving the new user document
        student.save((err) => {
            // If an error occurs, use flash messages to report the error
            if (err) {
                // Use the error handling method to get the error message
                message = getErrorMessage(err);

                // Save the error into flash memory
                req.flash('error', message);

                // Redirect the user back to the signup page
                return res.redirect('/register');
            }

            // If the student was created successfully use the Passport 'login' method to login
            req.login(student, (err) => {
                // If a login error occurs move to the next middleware
                if (err) return next(err);

                // Redirect the user back to the main application page
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that renders the login page
exports.renderLogin = function (req, res) {
    // If user is not connected render the login page, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Use the 'response' object to render the login page
        res.render('login', {
            // Set the page title variable
            title: 'Log in - myPortal',
            // Set the flash message variable
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method for log out
exports.logout = function(req, res) {
	// Use the Passport 'logout' method to logout
	req.logout();

	// Redirect the user back to the main application page
	res.redirect('/');
};

// Create a new controller method for displaying student list
exports.renderStudentList = function(req, res, next) {
    // Use the 'Student' static 'find' method to retrieve the list of students
    Student.find({}, (err, students) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('studentlist', {
                // Set the page title variable
                title: 'List of Students - myPortal',
                // Set all students
                students: students
            });
        }
    });
};