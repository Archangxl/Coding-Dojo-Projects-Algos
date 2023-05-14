const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel').schema;

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }, 
    cookbook: [Recipe],
    }, {timestamps: true}
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword )
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

const bcrypt = require('bcrypt');

UserSchema.pre('save', function(next) {
    if(this.isModified(this.password) || this.isNew) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
