const SharedRecipeController = require('../controllers/sharedRecipeController');

module.exports = app => {
    app.get('/api/allSharedRecipes', SharedRecipeController.findAllSharedRecipes);
    app.post('/api/createSharedRecipe', SharedRecipeController.createSharedRecipe);
    app.get('/api/grabSharedRecipe/:id', SharedRecipeController.findOneSharedRecipe);
    app.put('/api/UpdateSharedRecipe/:id', SharedRecipeController.updateSharedRecipe);
    app.delete('/api/sharedRecipe/delete', SharedRecipeController.deleteSharedRecipe);
}