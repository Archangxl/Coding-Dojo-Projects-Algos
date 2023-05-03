const UserController = require('../controllers/userController');

module.exports = app => {
    app.get('/api/allUsers', UserController.findAllUsers);
    app.post('/api/registerUser', UserController.registerUser);
    app.get('/api/grabUser/:id', UserController.findOneUser);
    app.put('/api/updateUser/:id', UserController.updateUser);
    app.delete('/api/deleteUser/:id', UserController.deleteUser);
}