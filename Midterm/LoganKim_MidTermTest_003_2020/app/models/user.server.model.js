// using the ref to reference another document
// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        // Set an email index
        index: true,
        unique: true,
        // Validate the email format
        required: 'Email is required',
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        // Trim the 'email' field
		trim: true
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length > 6,
            'ERR: Password should be longer than 6 characters!'
        ]
    },
    city: String,
    country: String,
    salt: {
		type: String
	},
	provider: {
		type: String,
		// Validate 'provider' value existance
		required: 'Provider is required'
	},
	created: {
		type: Date,
		// Create a default 'created' value
		default: Date.now
	}
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

// Create an instance method for authenticating user
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

// Find possible not used username
UserSchema.statics.findUniqueUsername = function (email, suffix, callback) {
    // Add a 'username' suffix
    const possibleUsername = email + (suffix || '');

    // Use the 'User' model 'findOne' method to find an available unique username
    this.findOne({
        email: possibleUsername
    }, (err, user) => {
        // If an error occurs call the callback with a null value, otherwise find find an available unique username
        if (!err) {
            // If an available unique username was found call the callback method, otherwise call the 'findUniqueUsername' method again with a new suffix
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(email, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('User', UserSchema);