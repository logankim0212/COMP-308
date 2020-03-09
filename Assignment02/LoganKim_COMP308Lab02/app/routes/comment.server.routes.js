// Load the 'index' controller
const comment = require('../controllers/comment.server.controller');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'comment' routes 
	app.route('/comment')
	.get(comment.renderComment)
	.post(comment.addComment);

	// Set up the 'commentlist' 
	app.get('/commentlist', comment.renderCommentList);

	// Set up the 'thankyou'
    app.get('/thankyou', comment.renderThankyou);
};