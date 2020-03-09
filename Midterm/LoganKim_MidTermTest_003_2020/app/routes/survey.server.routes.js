// Load the 'index' controller
const survey = require('../controllers/survey.server.controller');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'survey' routes 
	app.route('/survey')
	.get(survey.renderSurvey)
	.post(survey.addSurvey);

	// Set up the 'surveylist' 
	app.get('/surveylist', survey.renderSurveyList);

	app.post('/updatesurvey', survey.updateSurvey);

	app.get('/deletesurvey', survey.deleteSurvey);
	// Set up the 'thankyou'
    app.get('/thankyou', survey.renderThankyou);
};