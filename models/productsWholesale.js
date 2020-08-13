const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productsWholesaleSchema = new Schema({
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
            default: "BGN",
            required: true
        }
    },
    img: {
        type: String,
        required: true
    }
});

const ProductWholeSale = mongoose.model('productsWholesome', productsWholesaleSchema, 'products-wholesale');
module.exports = ProductWholeSale;