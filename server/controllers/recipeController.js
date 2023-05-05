const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientModel');

module.exports = {

    createRecipeThenaddRecipeToCookbook: (req, res) => {
        User.findByIdAndUpdate({_id: req.params.userId}, {new: true, runValidators: true})
            .then(user => {
                Recipe.create({name: req.body.name, instructions: req.body.instructions}) 
                    .then(recipe => {
                        let i = 1;
                        let array = [];
                        while (req.body["ingredient" + i.toString()] !== undefined) {
                            array.push({item: req.body["ingredient" + i.toString()]});
                            i++;
                        }
                        Ingredient.insertMany(array)
                            .then(ingredients => {
                                for (let i = 0; i < ingredients.length ; i++) {
                                    recipe.ingredients.push(ingredients[1]);
                                }
                                recipe.save();
                                user.cookbook.push(recipe);
                                user.save({validateBeforeSave: false});
                                res.status(200).json(user);
                            }) 
                            .catch(err => res.status(400).json({err: err, message: "Ing Error"}));
                    })
            })
            .catch(err => res.status(400).json({err: err, message: "User Error"}));
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