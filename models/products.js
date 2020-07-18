const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    price: {
        value: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "BGN",
            required: true
        }
    },
    img: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('products', productsSchema, 'products');
module.exports = Product;