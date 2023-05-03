const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

module.exports = {
    addRecipeToCookbook: (req, res) => {
        User.findById({_id: req.params.id}, {new: true, runValidators: true})
            .then(user => {
                Recipe.create(req.body)
                    .then(recipe => {
                        user.cookbook.push(recipe);
                    })
                    .catch(err => res.status(400).json(err));
                    user.save();
                    res.status(200).json(user);
            })
            .catch( err => res.status(400).json(err));
    }
}