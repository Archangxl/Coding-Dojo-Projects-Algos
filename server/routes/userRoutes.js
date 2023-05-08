const UserController = require('../controllers/userController');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/logout' ,UserController.logout);
    app.post('/api/registerUser', UserController.registerUser);
    app.post('/api/login' , UserController.login);
    app.put('/api/updateUser/:id', authenticate ,UserController.updateUser);
    app.delete('/api/deleteUser/:id', authenticate ,UserController.deleteUser);
}