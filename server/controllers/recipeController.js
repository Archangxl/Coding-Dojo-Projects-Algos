const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientModel');
const Instruction = require('../models/instructionsModel');
const jwt = require('jsonwebtoken');

module.exports = {

    findUserThenGrabAllRecipes: async(req,res) => {
        try {
            let findingUser = await User.findById({_id: req.params.userId});

            if (findingUser === null) {
                res.status(400).json({message: "User invalid"});
            }
            return res.status(200).json(findingUser);
        } catch(err) {
            res.status(400).json(err);
        }
    },

    createRecipeThenaddRecipeToCookbook: (req, res) => {
        //grabbing the user you want to add the recipe to 
        User.findByIdAndUpdate({_id: req.params.userId}, {new: true, runValidators: true})
            .then(user => {
                //after grabbing the user, then we create the recipe
                Recipe.create(req.body)
                    .then(recipe => {
                        //after grabbing the recipes then I grab the req.body.ingredient contents and put it into an array
                        let ingredientArray = [];
                        const ingredientReqBodyLength = req.body.ingredient.length;
                        for (let ingredientIndex = 0; ingredientIndex < ingredientReqBodyLength; ingredientIndex++) {
                            // if the req.body.ingredient content is empty break the loop and jump to creating the ingredients
                            if (req.body.ingredient[ingredientIndex]['ingredient' + ingredientIndex] === '') {
                                break;
                            }
                            // if the req.body.ingredient content isn't empty add it to the ingredient array
                            ingredientArray.push({item: req.body.ingredient[ingredientIndex]['ingredient' + ingredientIndex]});
                        }
                        
                        Ingredient.insertMany(ingredientArray)
                            .then(ingredients => {
                                
                                //once the ingredients have been create, loopp through the ingredients and add them to the recipes ingredient array
                                for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
                                    recipe.ingredients.push(ingredients[ingredientIndex]);
                                }
                                
                                //After the ingredient process is completed, then we will work on the instruction array

                                let instructionArray = [];
                                const bodyLength = req.body.instruction.length;
                                for (let instructionIndex = 0; instructionIndex < bodyLength; instructionIndex++) {
                                    if (req.body.instruction[instructionIndex]['instruction' + instructionIndex] === '') {
                                        break;
                                    }
                                    instructionArray.push({step: req.body.instruction[instructionIndex]['instruction' + instructionIndex]});
                                }
                                
                                Instruction.insertMany(instructionArray)
                                    .then(instructions => {
                                        
                                        for (let instructionIndex = 0; instructionIndex < instructions.length ; instructionIndex++) {
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
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    },

    findUserByIdThenfindRecipeById: (req, res) => {
        User.findById({_id: req.params.userId})
            .then(user => {
                res.status(200).json(user.cookbook.id(req.params.id));
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