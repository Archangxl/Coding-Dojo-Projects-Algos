const mongoose = require('mongoose');

const SharedRecipesSchema = new mongoose.Schema({
    userSharingRecipesFromTheirPrivateCookbook: {
        
    }
}, {timestamps: true});

const SharedRecipes = mongoose.model('SharedRecipes', SharedRecipesSchema);
module.exports = SharedRecipes;