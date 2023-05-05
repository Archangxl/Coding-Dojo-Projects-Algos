const mongoose = require('mongoose');
const Ingredient = require('../models/ingredientModel').schema;

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a recipe name'],
        minLength: [3, 'Please make your Recipe name at least 3 characters']
    }, 
    ingredients: [Ingredient],
    instructions: {
            type: String,
            required: [true, 'Please provide instructions'],
            minLength: [3, 'Please ']
    }
}, {timestamps: true});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;