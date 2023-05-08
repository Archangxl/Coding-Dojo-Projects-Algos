const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    registerUser: async (req, res) => {
        const userExists = await User.findOne({email: req.body.email});
        if (userExists) {
            res.status(400).json({message: "Email already exists"})
        } else {
            User.create(req.body)
                .then(user => {
                    const userToken = jwt.sign({
                        id: user._id
                    }, process.env.FIRST_SECRET_KEY);

                    res.cookie("userToken", userToken, { httpOnly: true }).json({
                        message: "This response has a cookie", user: user, token: userToken
                    });
                })
                .catch(err => {
                    res.status(400).json({err: err, message: "Something went wrong!"});
                })
        }
    },

    login: async(req, res) => {
        const user = await User.findOne({email: req.body.email});

        if (user === null) {
            return res.status(400).json({message: "Email is incorrect!"})
        }

        const passwordInDB = await bcrypt.compare(req.body.password, user.password);

        if (passwordInDB === false) {
            return res.status(400).json({message: "Password is incorrect!"})
        }

        const userTokenForCookies = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);
        const decodedCookieToken = jwt.decode(userTokenForCookies);
        res.cookie("userToken", userTokenForCookies, {
            httpOnly: true
        }).json({msg: "success", user: user, token: decodedCookieToken});
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
