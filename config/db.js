const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const Product = require('../models/products.js');
const ProductEN = require('../models/productsEn.js');
const ProductWholeSale = require('../models/productsWholesale.js');
const ProductWholeSaleEN = require('../models/productsWholesaleEn.js');

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connection with MongoDB established...')
})
.catch((err) => {
    console.log(err);
});

module.exports = Product;
module.exports = ProductEN;
module.exports = ProductWholeSale;
module.exports = ProductWholeSaleEN;