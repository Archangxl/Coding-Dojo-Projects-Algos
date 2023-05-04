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
            .then(user => {
                Recipe.findByIdAndUpdate({_id: req.params.id}, req.body, {})
                    .then(recipe => {
                        res.status(200).json(recipe);
                    })
                    .catch(err => res.status(400).json({err: err, message: "Couldn't find Recipe please try again"}));
            })
            .catch(err => res.status(400).json(err));
    },

    findUserByIdThenFindRecipeByIdThenUpdateRecipe: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                    Recipe.findById({_id: req.params.id})
                        .then(foundRecipe => {
                            Recipe.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators:true})
                                .then(updatedRecipe => {
                                    user.cookbook.pop(foundRecipe);
                                    user.cookbook.push(updatedRecipe);
                                    user.save({validateBeforeSave: false})
                                    res.status(200).json(user);
                                })
                                .catch(err => res.status(400).json(err));
                        })
                        .catch(err => res.status(400).json({err: err, message: "Couldn't find Recipe please try again"}));                
            })
            .catch(err => res.status(400).json(err));
            
    }, 

    findUserByIdThenDeleteRecipeByPoppingItFromCookbookArray: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                Recipe.findById({_id: req.params.id})
                    .then(res => {
                        user.cookbook.pop(Recipe.findByIdAndDelete({_id: req.params.id}))
                        user.save({validateBeforeSave: false})
                        res.status(200).json(res);
                    })
                    .catch(err => res.status(400).json({err: err, message: "Couldn't find Recipe please try again"}));
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}