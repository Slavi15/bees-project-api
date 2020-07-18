const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsEnSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        value: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "EUR",
            required: true
        }
    },
    img: {
        type: String,
        required: true
    }
});

const ProductEN = mongoose.model('productsEn', productsEnSchema, 'products-en');
module.exports = ProductEN;