// Load the module dependencies
const passport = require('passport');
const mongoose = require('mongoose');

// Define the Passport configuration method
module.exports = function () {
	// Load the 'Student' model
	const Student = mongoose.model('Student');

	// Use Passport's 'serializeUser' method to serialize the student id
	passport.serializeUser((student, done) => {
		done(null, student.id);
	});

	// Use Passport's 'deserializeUser' method to load the user document
	passport.deserializeUser((id, done) => {
		Student.findOne({
			_id: id
		}, '-password -salt', (err, student) => {
			done(err, student);
		});
	});

	// Load Passport's strategies configuration files
	require('./strategies/local.js')();
};