const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({

    item: {
        type: String,
        required: [true, 'Please fill out ingredients'],
        mingLength: [3, 'Please make Indgredient at least 3 characters long']
    }

}, {timestamps: true});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;