const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

const JWT_TOKEN = process.env.JWT_TOKEN;

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, JWT_TOKEN, { expiresIn: maxAge });
}

const signInGet = (req, res) => {
    try {
        res.status(200).send('sign in');
    } catch (err) {
        console.log(err.message);
    }
};

const signInPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signIn(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

async function signUpGet(req, res) {
    try {
        res.status(200).render('sign up');
    } catch (err) {
        console.log(err.message);
    }
};

const signUpPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
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

module.exports = { signUpGet, signInGet, signUpPost, signInPost, logOutGet };