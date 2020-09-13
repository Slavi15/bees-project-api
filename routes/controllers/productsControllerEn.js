const ProductEN = require('../../models/productsEn.js');

const listProductsEN = async (req, res) => {
    try {
        const producten = await ProductEN.find();
        res.status(200).json(producten)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
}

const createProductEN = async (req, res) => {
    const producten = new ProductEN(req.body)
    try {
        const newProduct = await producten.save();
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const readProductEN = async (req, res, next) => {
    let producten;
    try {
        producten = await ProductEN.findById(req.params.productenid);
        if (producten == null) {
            return res.status(404).json({ message: "Can't find Product" });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    res.producten = producten;
    next();
}

const updateProductEN = async (req, res) => {
    try {
        const producten = await ProductEN.findOneAndUpdate({ _id: req.params.productenid }, req.body, { new: true });
        res.status(200).json(producten);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProductEN = async (req, res) => {
    try {
        await ProductEN.findByIdAndDelete({ _id: req.params.productenid });
        res.status(200).json({ message: "Product has been deleted" });
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { listProductsEN, createProductEN, readProductEN, updateProductEN, deleteProductEN };