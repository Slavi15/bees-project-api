const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { roles } = require('../../config/roles.js');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    const errors = {
        email: '', 
        password: '' 
    };

    if(err.message === 'Incorrect email') {
        errors.email = 'That email is not registered';
        return errors;
    }

    if(err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
        return errors;
    }

    if(err.code === 11000) {
        errors.email = "That email is already connected to an account";
        return errors;
    };

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    };

    return errors;
}

const signInGet = async(req, res) => {
    let user;
    try {
        const userId = req.params.userId
        user = await User.findById(userId);
        res.status(200).json({ data: user })
    } catch (err) {
        console.log(err.message);
    }
};

const signInPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signIn(email, password);
        const maxAge = 1 * 24 * 60 * 60;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: maxAge });
        await User.findByIdAndUpdate(user._id, { token });
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true, secure: true, domain: 'https://beesproject-client.herokuapp.com' });
        res.status(200).json({ 
            data: { email: user.email, role: user.role },
            token
        });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const signUpPost = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await User.create({ email: email, password: password, role: role });
        const maxAge = 1 * 24 * 60 * 60;
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: maxAge });
        user.token = token;
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true, secure: true, domain: 'https://beesproject-client.herokuapp.com' });
        res.status(201).json({ data: user, token });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const logOutGet = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('http://localhost:3000');
    next();
}

const grantAccess = function(action, resource) {
    return async(req, res, next) => {
        try {
            //console.log(req);
            const permission = roles.can(req.user.role)[action](resource);
            if(!permission.granted) {
                res.status(401).json({ message: 'Unauthorized for this action' })
            }
            next();
        } catch(err) {
            next(err);
        }
    }
}

const allowIfLogged = async(req, res, next) => {
    try {
        //console.log(res.locals)
        const user = res.locals.loggedInUser;
        if(!user) {
            res.status(401).json({ message: 'You need to be logged in' })
        }
        req.user = user;
        next();
    } catch(err) {
        console.log(err);
    }
}

async function signUpGet(req, res) {
    try {
        res.status(200).render('sign up');
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = { signUpGet, signInGet, signUpPost, signInPost, logOutGet, grantAccess, allowIfLogged };