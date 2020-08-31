const Product = require('../../models/products.js');

async function listProducts(req, res) {
    try {
        const product = await Product.find();
        res.status(200).json(product)
    } catch(err) {
        res.status(500).send({ message: err.message})
    }
}

async function createProduct(req, res) {
    const product = new Product(req.body)
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

async function readProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.productid);
        if (product == null) {
            return res.status(404).json({ message: "Can't find Product" });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}

async function updateProduct(req, res) {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.productid }, req.body, { new: true });
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteProduct(req, res) {
    try {
        await Product.findByIdAndDelete({ _id: req.params.productid });
        res.status(200).json({ message: "Product has been deleted" });
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { listProducts, createProduct, readProduct, updateProduct, deleteProduct };