const SharedUserRecipe = require('../models/sharedRecipesModel');

module.exports = {

    findAllSharedRecipes: (req,res) => {
        SharedUserRecipe.find().sort({"name": 'asc'})
            .then(allRecipes => {
                res.status(200).json(allRecipes);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    createSharedRecipe: (req, res) => {
        SharedUserRecipe.create(req.body)
            .then(newRecipes => {
                res.status(200).json(newRecipes);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    findOneSharedRecipe: (req, res) => {
        SharedUserRecipe.findOne({_id: req.params.id})
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    updateSharedRecipe: (req, res) => {
        SharedUserRecipe.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
            .then(updatedRecipe => {
                res.status(200).json(updatedRecipe);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }, 

    deleteSharedRecipe: (req, res) => {
        SharedUserRecipe.deleteOne({_id: req.params.id})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}