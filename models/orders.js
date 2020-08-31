const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const orderSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 5
    }
});

const Order = mongoose.model('orders', orderSchema, 'orders');
module.exports = Order;