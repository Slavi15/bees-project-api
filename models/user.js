const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [isEmail, "Invalid email"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum pass length is 6 characters"]
    }
});

// this refers to the model

// fire a function after doc saved to db
userSchema.post('save', function(doc, next) {
    console.log('New user has been created', doc);
    next();
});

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to log in user
userSchema.statics.signIn = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw new Error('Incorrect password');
    }
    throw new Error('Incorrect email');
}

const User = mongoose.model('user', userSchema, 'users');
module.exports = User;