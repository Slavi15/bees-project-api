const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsWholesaleENSchema = new Schema({
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
        },
        amount: {
            type: String,
            required: true
        }
    },
    img: {
        type: String,
        required: true
    }
});

const ProductWholeSaleEN = mongoose.model('productsWholesaleEn', productsWholesaleENSchema, 'products-wholesale-en');
module.exports = ProductWholeSaleEN;