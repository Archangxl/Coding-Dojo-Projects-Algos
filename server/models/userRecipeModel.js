const mongoose = require('mongoose');

const userRecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a recipe name'],
        minLength: [3, 'Please make your Recipe name at least 3 characters']
    },
    ingredients: [
        {
            type: String, 
            required: [true, 'Please provide ingredients'],
            minLength: [3, 'Please make Ingredient at least 3 characters long']
        }
    ],
    instructions:  [
        {
            type: String,
            required: [true, 'Please provide instructions'],
            minLength: [3, 'Please ']
        }
    ]
}, {timestamps: true});

const UserRecipe = mongoose.model('UserRecipe', userRecipeSchema);
module.exports = UserRecipe;