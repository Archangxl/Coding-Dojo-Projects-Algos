const RecipeController = require('../controllers/recipeController');

module.exports = app => {
    app.get('/api/allRecipes', RecipeController.findAllRecipes);
    app.post('/api/createRecipe', RecipeController.createRecipe);
    app.get('/api/grabRecipe/:id', RecipeController.findOneRecipe);
    app.put('/api/updateRecipe/:id', RecipeController.updateRecipe);
    app.delete('/api/deleteRecipe/:id', RecipeController.deleteRecipe);
}