// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define a new SurveySchema
const SurveySchema = new Schema({
    surveyId: String,
    gameGenre: String,
    daysPerYear: Number,
    age: Number,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create the 'Survey' model out of the 'SurveySchema'
mongoose.model('Survey', SurveySchema);