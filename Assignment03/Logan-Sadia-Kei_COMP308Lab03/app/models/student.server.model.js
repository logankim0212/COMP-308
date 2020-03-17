// Load the module dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'StudentSchema'
var StudentSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  program: String,
  phoneNumber: String,
  email: {
    type: String,
    // Validate the email format
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  studentId: {
    type: String,
    // Set a unique 'student Id' index
    unique: true,
    // Validate 'student Id' value existance
    required: "Student Id is required",
    // Trim the 'student Id' field
    trim: true
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [
      password => password && password.length > 6,
      "Password should be longer than 6 letters"
    ]
  }
});

// Set the 'fullname' virtual property
StudentSchema.virtual("fullName")
  .get(function() {
    return this.firstName + " " + this.lastName;
  })
  .set(function(fullName) {
    const splitName = fullName.split(" ");
    this.firstName = splitName[0] || "";
    this.lastName = splitName[1] || "";
  });

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre("save", function(next) {
  //hash the password before saving it
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Create an instance method for authenticating user
StudentSchema.methods.authenticate = function(password) {
  //compare the hashed password of the database
  //with the hashed version of the password the user enters
  return this.password === bcrypt.hashSync(password, saltRounds);
};

// Configure the 'StudentSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

// Create the 'Student' model out of the 'StudentSchema'
mongoose.model("Student", StudentSchema);
