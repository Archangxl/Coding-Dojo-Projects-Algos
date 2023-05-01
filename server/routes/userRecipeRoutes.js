const UserRecipeController = require('../controllers/userRecipeController');

module.exports = app => {
    app.get('/api/allRecipes', UserRecipeController.findAllRecipes);
    app.post('/api/createRecipe', UserRecipeController.createRecipe);
    app.get('/api/grabRecipe/:id', UserRecipeController.findOneRecipe);
    app.put('/api/updateRecipe/:id', UserRecipeController.updateRecipe);
    app.delete('/api/deleteRecipe/:id', UserRecipeController.deleteRecipe);
}