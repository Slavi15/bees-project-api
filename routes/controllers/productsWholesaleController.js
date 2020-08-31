const ProductWholeSale = require('../../models/productsWholesale.js');

async function listProductsWholesale(req, res) {
    try {
        const productwholesale = await ProductWholeSale.find();
        res.status(200).json(productwholesale)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
}

async function createProductWholesale(req, res) {
    const productwholesale = new ProductWholeSale(req.body)
    try {
        const newProduct = await productwholesale.save();
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

async function readProductWholesale(req, res, next) {
    let productwholesale;
    try {
        productwholesale = await ProductWholeSale.findById(req.params.productwholesaleid);
        if (productwholesale == null) {
            return res.status(404).json({ message: "Can't find Product" });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    res.productwholesale = productwholesale;
    next();
}

async function updateProductWholesale(req, res) {
    try {
        const productwholesale = await ProductWholeSale.findOneAndUpdate({ _id: req.params.productwholesaleid }, req.body, { new: true });
        res.status(200).json(productwholesale);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteProductWholesale(req, res) {
    try {
        await ProductWholeSale.findByIdAndDelete({ _id: req.params.productwholesaleid });
        res.status(200).json({ message: "Product has been deleted" });
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { listProductsWholesale, createProductWholesale, readProductWholesale, updateProductWholesale, deleteProductWholesale };