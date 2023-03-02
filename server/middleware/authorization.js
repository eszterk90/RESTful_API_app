const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(403);

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        req.user = user;
        next()
    })
}

module.exports = {auth};