const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a recipe name'],
        minLength: [3, 'Please make your Recipe name at least 3 characters']
    }, 
    ingredients: {
            type: String, 
            required: [true, 'Please provide ingredients'],
            minLength: [3, 'Please make Ingredient at least 3 characters long']
    },
    instructions: {
            type: String,
            required: [true, 'Please provide instructions'],
            minLength: [3, 'Please ']
    }
}, {timestamps: true});

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
    cookbook: [RecipeSchema]
    }, {timestamps: true}
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword )
    .set( value => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassowrd', 'Password must match confirm password');
    }
    next();
});

const bcrypt = require('bcrypt');

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
