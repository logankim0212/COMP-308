// Load the module dependencies
const Survey = require('mongoose').model('Survey');
const User = require('mongoose').model('User');

// Create a new controller method that renders the survey page
exports.renderSurvey = function (req, res) {
    // If user is not connected redirect the user back to the main application page, otherwise render survey page
    if (!req.user) {
        return res.redirect('/');
    } else {
        // Use the 'response' object to render the survey page
        res.render('survey', {
            // Set the page title variable
            title: 'Survey Form - myPortal',
            // Set the email variable
            email: req.user ? req.user.email : '',
            // Set the flash message variable
            messages: req.flash('error') || req.flash('info')
        });
    }
};


// 'addSurvey' controller method to add a new survey
exports.addSurvey = function (req, res) {
    // Create a new instance of the 'Survey' Mongoose model
    let survey = new Survey(req.body);

    // Set the survey user property
    survey.user = req.user._id;

    // Use the 'Survey' instance's 'save' method to save a new survey document
    survey.save((err) => {
        if (err) {
            // Save the error into flash memory
            req.flash('error', message);

            // Redirect the user back to the survey page
            return res.redirect('/survey');
        } else {
            // Redirect the user to the thankyou page with custom url with email param
            return res.redirect('/thankyou?email=' + req.user.email);
        }
    });
};

// 'updateSurvey' controller method to update a survey
exports.updateSurvey = function (req, res, next) {
    //initialize findOneAndUpdate method arguments
    let modelId = req.param('id');
    let query = { _id: modelId };
    let update = {
        "$set": {
          "gameGenre": req.body.gameGenre,
          "daysPerYear": req.body.daysPerYear,
          "age": req.body.age
        }
      };

    // Use the 'Survey' static 'findOneAndUpdate' method to update a specific survey by _id
    Survey.findOneAndUpdate(query, update, (err, survey) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            res.redirect('/');
        }
    });
};

// 'deleteSurvey' controller method to delete a survey
exports.deleteSurvey = function (req, res) {
    let modelId = req.param('id');

    Survey.findOneAndRemove({
        _id: modelId
    }, function (err, survey) {
        if (err) throw err;
        console.log("Success");
    });

    res.redirect('/');
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

// Create a new controller method that renders the survey list page
exports.renderSurveyList = function (req, res, next) {
    let email = req.param('email');

    // Use the 'User' static 'findOne' method to retrieve a specific user
    User.findOne({
        // using the email to find a user
        email: email
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'userId' property
            let userId = user._id;
            // Use the 'Survey' static 'find' method to retrieve the list of surveys with a specific userId
            Survey.find({
                user: userId
            }, (err, surveys) => {
                if (err) {
                    // Call the next middleware with an error message
                    return next(err);
                } else {
                    // Use the 'response' object to render the surveylist page
                    res.render('surveylist', {
                        // Set the page title variable
                        title: 'List of Surveys - myPortal',
                        // Set email variable
                        email: email,
                        // Set all surveys
                        surveys: surveys
                    });
                }
            });
        }
    });
};