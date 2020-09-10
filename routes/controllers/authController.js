const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { 
        email: '', 
        password: '' 
    };

    if(err.message === 'Incorrect email') {
        errors.email = 'That email is not registered';
    }

    if(err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
    }

    if(err.code === 11000) {
        errors.email = "that email is already connected to an account";
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

async function signInGet(req, res) {
    try {
        res.status(200).send('sign in')
    } catch (err) {
        
    }
};

const signInPost = async(req, res) => {
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
        res.status(200).render('sign up')
    } catch (err) {
        
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

module.exports = { signUpGet, signInGet, signUpPost, signInPost };