const mongoose = require('mongoose');
const UserRecipe = require('../models/userRecipeModel');

const SharedRecipesSchema = new mongoose.Schema({
    userSharingRecipesFromTheirPrivateCookbook: {
        type: mongoose.ObjectId,
        ref: 'UserRecipe'
    }
}, {timestamps: true});

const SharedRecipes = mongoose.model('SharedRecipes', SharedRecipesSchema);
module.exports = SharedRecipes;