const mongoose = require("mongoose");
const Course = mongoose.model("Course");
const Student = require("mongoose").model("Student");

//
function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}
//
exports.create = function(req, res) {
  const course = new Course();
  course.courseCode = req.body.courseCode.toUpperCase();
  course.courseName = req.body.courseName.toUpperCase();
  course.section = req.body.section;
  course.semester = req.body.semester.toUpperCase();
  course.creator = req.body.studentId;
  console.log(req.body);
  //
  //
  Student.findOne({ studentId: req.body.studentId }, (err, student) => {
    if (err) {
      return getErrorMessage(err);
    }
    //
    req.id = student._id;
    console.log("student._id", req.id);
  }).then(function() {
    course.creator = req.id;
    console.log("req.course._id", req.id);

    course.save(err => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(course);
      }
    });
  });
};
//
exports.list = function(req, res) {
  Course.find()
    .sort("-created")
    .populate("creator", "firstName lastName fullName studentId")
    .exec((err, courses) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.status(200).json(courses);
      }
    });
};
//
exports.courseByID = function(req, res, next, id) {
  Course.findById(id)
    .populate("creator", "firstName lastName fullName studentId")
    .exec((err, course) => {
      if (err) return next(err);
      if (!course) return next(new Error("Failed to load course " + id));
      req.course = course;
      console.log("in courseById:", req.course);
      next();
    });
};
//
exports.read = function(req, res) {
  res.status(200).json(req.course);
};
//
exports.update = function(req, res, next) {
  console.log("in update:", req.course);

  const course = req.course;
  course.courseCode = req.body.courseCode.toUpperCase();
  course.courseName = req.body.courseName.toUpperCase();
  course.section = req.body.section;
  course.semester = req.body.semester.toUpperCase();

  Course.findByIdAndUpdate(course._id, course, function(err, course) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(course);
  });
};
//
exports.delete = function(req, res) {
  const course = req.course;
  course.remove(err => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      console.log("!!!!!");
      console.log(course);
      res.status(200).json(course);
    }
  });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function(req, res, next) {
  console.log("in hasAuthorization: ", req.course.creator);
  console.log("in hasAuthorization: ", req.student._id);

  if (req.course.creator.id !== req.student._id) {
    return res.status(403).send({
      message: "Student is not authorized"
    });
  }
  next();
};
