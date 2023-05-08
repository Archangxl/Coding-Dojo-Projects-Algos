const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientModel');
const Instruction = require('../models/instructionsModel');
const jwt = require('jsonwebtoken');

module.exports = {

    findUserThenGrabAllRecipes: async(req,res) => {
        let findingUser = await User.findById({_id: req.params.userId});

        if (findingUser === null) {
            res.status(400).json({message: "User invalid"});
        }
        return res.status(200).json(findingUser.cookbook);
    },

    createRecipeThenaddRecipeToCookbook: (req, res) => {
        User.findByIdAndUpdate({_id: req.params.userId}, {new: true, runValidators: true})
            .then(user => {
                Recipe.create({name: req.body.name}) 
                    .then(recipe => {
                        //ingredients first
                        let ingredientFormIndex = 0;
                        let ingredientArray = [];
                        while (req.body["ingredient" + ingredientFormIndex.toString()] !== undefined) {
                            ingredientArray.push({item: req.body["ingredient" + ingredientFormIndex.toString()]});
                            ingredientFormIndex++;
                        }
                        Ingredient.insertMany(ingredientArray)
                            .then(ingredients => {
                                for (let ingredientIndex = 0; ingredientIndex < ingredients.length ; ingredientIndex++) {
                                    recipe.ingredients.push(ingredients[ingredientIndex]);
                                }
                                
                                //instructions second

                                let instructionFormIndex = 0;
                                let instructionArray = [];
                                while (req.body["instruction" + instructionFormIndex.toString()] !== undefined) {
                                    instructionArray.push({step: req.body["instruction" + instructionFormIndex.toString()]});
                                    instructionFormIndex++;
                                }
                                
                                Instruction.insertMany(instructionArray)
                                    .then(instructions => {
                                        
                                        for (let instructionIndex = 0; instructionIndex < instructions.length; instructionIndex++) {
                                            recipe.instructions.push(instructions[instructionIndex]);
                                        }
                                        
                                        recipe.save();
                                        user.cookbook.push(recipe);
                                        user.save({validateBeforeSave: false});
                                        
                                        res.status(200).json(user);
                                    })
                                    .catch(err => res.status(400).json({err: err, message: "Instruction Error"}));
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
                const recipe = user.cookbook.id(req.params.id);
                recipe.ingredients = [];
                recipe.instructions = [];
                //ingredients first

                let ingredientFormIndex = 0;
                let ingredientArray = [];
                while (req.body["ingredient" + ingredientFormIndex.toString()] !== undefined) {
                    ingredientArray.push({item: req.body["ingredient" + ingredientFormIndex.toString()]});
                    ingredientFormIndex++;
                }
                
                Ingredient.insertMany(ingredientArray)
                    .then(ingredients => {
                        for (let i = 0; i < ingredients.length ; i++) {
                            recipe.ingredients.push(ingredients[i]);
                        }
                         //instructions second

                        let instructionFormIndex = 0;
                        let instructionArray = [];
                        while (req.body["instruction" + instructionFormIndex.toString()] !== undefined) {
                            instructionArray.push({step: req.body["instruction" + instructionFormIndex.toString()]});
                            instructionFormIndex++;
                        }
                        Instruction.insertMany(instructionArray)
                            .then(instructions => {
                                
                                for (let instructionIndex = 0; instructionIndex < instructions.length; instructionIndex++) {
                                    recipe.instructions.push(instructions[instructionIndex]);
                                }
                                recipe.save();
                                user.save({validateBeforeSave: false});
                                res.status(200).json(user);
                            })
                            .catch(err => res.status(400).json({err: err, message: "Instruction Error"}));
                            
                    }) 
                    
                    .catch(err => res.status(400).json({err: err, message: "Ing Error"}));
                    
            })
            .catch(err => res.status(400).json({err: err, message: "Couldn't find User please try again!"}));
    }, 

    findUserByIdThenDeleteRecipeByPoppingItFromCookbookArray: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                user.cookbook.id(req.params.id).deleteOne();
                user.save({validateBeforeSave: false});
                res.status(200).json(user);
            })
            .catch(err => res.status(408).json({err: err, message: "Couldn't find User please try again!"}));
    }
}