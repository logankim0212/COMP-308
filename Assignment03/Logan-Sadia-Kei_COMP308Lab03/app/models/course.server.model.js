const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
  courseCode: {
    type: String,
    default: "",
    trim: true,
    required: "Course code cannot be blank"
  },
  courseName: {
    type: String,
    default: "",
    trim: true,
    required: "Course name cannot be blank"
  },
  section: {
    type: String,
    default: "",
    trim: true,
    required: "Section cannot be blank"
  },
  creator: {
    type: Schema.ObjectId,
    ref: "Student"
  },
  semester: String
});
mongoose.model("Course", CourseSchema);
