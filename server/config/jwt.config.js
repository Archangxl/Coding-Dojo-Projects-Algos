const jwt = require('jsonwebtoken');
const secret = 'key';
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({verified: false, token: req.cookies.userToken, secret: secret});
        } else{
            next();
        }
    })
}