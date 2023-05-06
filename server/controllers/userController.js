const User = require('../models/userModel');
const RecipeController = require('../controllers/recipeController');

module.exports = {

    findAllUsers: (req,res) => {
        User.find().sort({"firstName": 'asc'})
            .then(allUsers => {
                res.status(200).json(allUsers);;
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    registerUser: (req, res) => {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.Kitchen);

                res.cookie("userToken", userToken, { httpOnly: true }).json({
                    message: "This response has a cookie", user: user
                });
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    login: async(req, res) => {
        const user = await User.findOne({_id: req.body.email});
        
        if (user === null) {
            return res.status(400).json({message: "User doesn't exits!"});
        }

        const passwordInDB = await bcrypt.compare(req.body.password, user.password);

        if (!passwordInDB) {
            return res.sendStatus(400).json({message: "Password is incorrect!"});
        }

        const userTokenForCookies = jwt.sign({
            id: user._id
        }, process.env.Kitchen);

        res.cookie("userToken", userTokenForCookies, {
            httpOnly: true
        }).json({msg: success})
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
            .then(updateUser => {
                res.status(200).json(updateUser);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    }, 

    logout: (req, res) => {
        res.clearCookie('userToken');
        res.status(200).json({message: "logged out!"})
    },

    deleteUser: (req, res) => {
        User.deleteOne({_id: req.params.id})
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}
