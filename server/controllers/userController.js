const User = require('../models/userModel');

module.exports = {

    findAllUsers: (req,res) => {
        User.find().sort({"name": 'asc'})
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
                res.status(200).json( {user: user});
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },
    addToCookbook: (req,res) => {
        User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
            .then(user => {
                user.cookbook.push(req.body);
                res.status(200).json({ user: user });
            })
            .catch(err => {
                res.status(400).json(err);
            })
    },

    findOneUser: (req, res) => {
        User.findOne({_id: req.params.id})
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).json(err);
        })
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
