const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
require('dotenv').config();

const JWT_TOKEN = process.env.JWT_TOKEN;

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = { checkUser };