const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const { isEmail, isMobilePhone, isNumeric } = require('validator');

const orderSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        required: true
    },
    firstName: {
        type: String,
        required: [true, "Please enter a first name"],
        minlength: [2, "Minimum first name length is 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name"],
        minlength: [3, "Minimum last name length is 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        lowercase: true,
        validate: [isEmail, "Invalid email"]
    },
    address: {
        type: String,
        required: [true, "Please enter an address"],
        minlength: [7, 'Minimum 7 characters needed for address information']
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a phone number"],
        validate: [isMobilePhone, isNumeric, "Invalid phone number"],
        minlength: [7, 'Minimum phone number length is 7 digits'],
        maxlength: [15, 'Maximum phone number length is 15 digits']
    },
    products: [
        {
            title: {
                type: String
            },
            price: {
                value: {
                    type: Number
                },
                currency: {
                    type: String
                }
            },
            quantity: {
                type: Number
            }
        }
    ],
    total: {
        type: Number
    }
});

const Order = mongoose.model('order', orderSchema, 'orders');
module.exports = Order;