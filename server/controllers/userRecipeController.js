const UserRecipe = require('../models/userRecipeModel');

module.exports = {

    findAllRecipes: (req,res) => {
        UserRecipe.find().sort({"name": 'asc'})
            .then(allRecipes => {
                res.status(200).json(allRecipes);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    createRecipe: (req, res) => {
        UserRecipe.create(req.body)
            .then(newRecipes => {
                res.status(200).json(newRecipes);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    findOneRecipe: (req, res) => {
        UserRecipe.findOne({_id: req.params.id})
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    updateRecipe: (req, res) => {
        UserRecipe.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
            .then(updatedRecipe => {
                res.status(200).json(updatedRecipe);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }, 

    deleteRecipe: (req, res) => {
        UserRecipe.deleteOne({_id: req.params.id})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}