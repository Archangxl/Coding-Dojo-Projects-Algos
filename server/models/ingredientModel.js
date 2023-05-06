const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({

    item: {
        type: String,
        required: [true, 'Please fill out ingredients']
    }

}, {timestamps: true});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;