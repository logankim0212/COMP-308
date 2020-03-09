// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define a new CommentSchema
const CommentSchema = new Schema({
    courseCode: String,
    courseName: String,
    program: String,
    semester: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});

// Create the 'Comment' model out of the 'CommentSchema'
mongoose.model('Comment', CommentSchema);