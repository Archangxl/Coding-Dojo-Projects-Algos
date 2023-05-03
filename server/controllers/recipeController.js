const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

module.exports = {
    findAllRecipes: (req,res) => {
        Recipe.find()
            .then(allRecipes => {
                res.status(200).json(allRecipes);;
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

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

    findOneRecipe: (req, res) => {
        Recipe.findOne({_id: req.params.id})
            .then(recipe => {
                res.status(200).json(recipe);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    updateRecipe: (req, res) => {
        Recipe.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
            .then(updateRecipe => {
                res.status(200).json(updateRecipe);
            })
            .catch(err => {
                res.status(400).json(err);
            })
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