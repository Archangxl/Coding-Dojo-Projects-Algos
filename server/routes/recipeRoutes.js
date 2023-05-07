const RecipeController = require('../controllers/recipeController');
const {authenticate} = require('../config/jwt.config');
module.exports = app => {
    app.get('/api/:userId/grabRecipes', authenticate ,RecipeController.findUserThenGrabAllRecipes);
    app.post('/api/:userId/createRecipe', authenticate,RecipeController.createRecipeThenaddRecipeToCookbook);
    app.get('/api/:userId/grabRecipe/:id', authenticate,RecipeController.findUserByIdThenfindRecipeById);
    app.put('/api/:userId/updateRecipe/:id', authenticate,RecipeController.findUserByIdThenFindRecipeByIdThenUpdateRecipe);
    app.delete('/api/:userId/deleteRecipe/:id', authenticate, RecipeController.findUserByIdThenDeleteRecipeByPoppingItFromCookbookArray);
}