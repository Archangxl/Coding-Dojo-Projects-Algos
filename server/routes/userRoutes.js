const UserController = require('../controllers/userController');

module.exports = app => {
    app.get('/api/logout', UserController.logout);
    app.post('/api/registerUser', UserController.registerUser);
    app.get('/api/login', UserController.login);
    app.put('/api/updateUser/:id', UserController.updateUser);
    app.delete('/api/deleteUser/:id', UserController.deleteUser);
}