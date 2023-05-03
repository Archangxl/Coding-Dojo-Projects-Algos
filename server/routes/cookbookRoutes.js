const CookbookController = require('../controllers/cookbookController');

module.exports = app => {
    app.put('/api/add/recipe/:id', CookbookController.addRecipeToCookbook);
}