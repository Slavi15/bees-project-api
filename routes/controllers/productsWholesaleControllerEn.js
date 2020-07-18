const ProductWholeSaleEN = require('../../models/productsWholesaleEn.js');

async function listProductsWholesaleEN(req, res) {
    try {
        const productwholesaleen = await ProductWholeSaleEN.find();
        res.status(200).json(productwholesaleen)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
}

async function createProductWholesaleEN(req, res) {
    const productwholesaleen = new ProductWholeSaleEN(req.body)
    try {
        const newProduct = await productwholesaleen.save();
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

async function readProductWholesaleEN(req, res, next) {
    let productwholesaleen;
    try {
        productwholesaleen = await ProductWholeSaleEN.findById(req.params.productwholesaleenid);
        if (productwholesaleen == null) {
            return res.status(404).json({ message: "Can't find Product" });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    res.productwholesaleen = productwholesaleen;
    next();
}

async function updateProductWholesaleEN(req, res) {
    try {
        const productwholesaleen = await ProductWholeSaleEN.findOneAndUpdate({ _id: req.params.productwholesaleenid }, req.body, { new: true });
        res.status(200).json(productwholesaleen);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteProductWholesaleEN(req, res) {
    try {
        await ProductWholeSaleEN.remove({ _id: req.params.productwholesaleenid });
        res.status(200).json({ message: "Product has been deleted" });
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { listProductsWholesaleEN, createProductWholesaleEN, readProductWholesaleEN, updateProductWholesaleEN, deleteProductWholesaleEN };