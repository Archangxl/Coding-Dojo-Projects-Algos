const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

module.exports = {

    createRecipeThenaddRecipeToCookbook: (req, res) => {
        User.findByIdAndUpdate({_id: req.params.userId}, {new:true, runValidators: true})
            .then(user => {
                Recipe.create(req.body)
                    .then(recipe => {
                        user.cookbook.push(recipe);
                        user.save({validateBeforeSave: false});
                        res.status(200).json(user);
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    })
                })
            .catch( err => res.status(400).json(err));
    },

    findUserByIdThenfindRecipeById: (req, res) => {
        User.findById({_id: req.params.userId})
            Recipe.findByIdAndUpdate({_id: req.params.id}, req.body, {})
                .then(recipe => {
                    res.status(200).json(recipe);
                })
                .catch(err => res.status(400).json(err));
    },

    findUserByIdThenFindRecipeByIdThenUpdateRecipe: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                let recipeId = req.params.id;
                let i = 0;
                while (i < user.cookbook.length()) {
                    if (user.cookbook[i]._id.string() === recipeId.toString()) {
                        
                    }
                    i++;
                }
            })
            .catch(err => res.status(400).json(err));
            
    }, 

    deleteRecipe: (req, res) => {
        Recipe.deleteOne({_id: req.params.id})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}