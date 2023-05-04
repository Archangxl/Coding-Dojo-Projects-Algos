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
                    .catch(err => res.status(400).json(err));
                })
            .catch( err => res.status(400).json(err));
    },

    findUserByIdThenfindRecipeById: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                res.status(400).json(user.cookbook.id(req.params.id));
            })
            .catch(err => res.status(400).json(err));
    },

    findUserByIdThenFindRecipeByIdThenUpdateRecipe: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                user.cookbook.id(req.params.id).name = req.body.name;
                user.cookbook.id(req.params.id).ingredients = req.body.ingredients;
                user.cookbook.id(req.params.id).instructions = req.body.instructions;
                user.save({validateBeforeSave: false});
                res.status(200).json(user.cookbook.id(req.params.id));
            })
            .catch(err => res.status(408).json("Couldn't find Recipe please try again!"));
    }, 

    findUserByIdThenDeleteRecipeByPoppingItFromCookbookArray: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                user.cookbook.id(req.params.id).deleteOne();
                user.save({validateBeforeSave: false});
                res.status(200).json(user);
            })
            .catch(err => res.status(408).json("Couldn't find Recipe please try again!"));
    }
}