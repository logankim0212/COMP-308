const students = require("../../app/controllers/student.server.controller");
const courses = require("../../app/controllers/course.server.controller");
//
module.exports = function(app) {
  app
    .route("/api/courses")
    .get(courses.list)
    .post(students.requiresLogin, courses.create);
  //
  app
    .route("/api/courses/:courseId")
    .get(courses.read)
    .put(students.requiresLogin, courses.update)
    .delete(students.requiresLogin, courses.delete);

  app.param("courseId", courses.courseByID);
};
