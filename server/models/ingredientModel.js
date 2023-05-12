const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({

    item: {
        type: String
    }

}, {timestamps: true});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;