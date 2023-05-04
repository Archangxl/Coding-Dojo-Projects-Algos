const RecipeController = require('../controllers/recipeController');

module.exports = app => {
    app.post('/api/:userId/createRecipe', RecipeController.createRecipeThenaddRecipeToCookbook);
    app.get('/api/:userId/grabRecipe/:id', RecipeController.findUserByIdThenfindRecipeById);
    app.put('/api/:userId/updateRecipe/:id', RecipeController.findUserByIdThenFindRecipeByIdThenUpdateRecipe);
    app.delete('/api/:userId/deleteRecipe/:id', RecipeController.findUserByIdThenDeleteRecipeByPoppingItFromCookbookArray);
}