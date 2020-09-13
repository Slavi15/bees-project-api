const ProductWholeSaleEN = require('../../models/productsWholesaleEn.js');

const listProductsWholesaleEN = async (req, res) => {
    try {
        const productwholesaleen = await ProductWholeSaleEN.find();
        res.status(200).json(productwholesaleen)
    } catch(err) {
        res.status(500).send({ message: err.message })
    }
}

const createProductWholesaleEN = async (req, res) => {
    const productwholesaleen = new ProductWholeSaleEN(req.body)
    try {
        const newProduct = await productwholesaleen.save();
        res.status(201).json(newProduct)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

const readProductWholesaleEN = async (req, res, next) => {
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

const updateProductWholesaleEN = async (req, res) => {
    try {
        const productwholesaleen = await ProductWholeSaleEN.findOneAndUpdate({ _id: req.params.productwholesaleenid }, req.body, { new: true });
        res.status(200).json(productwholesaleen);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteProductWholesaleEN = async (req, res) => {
    try {
        await ProductWholeSaleEN.findByIdAndDelete({ _id: req.params.productwholesaleenid });
        res.status(200).json({ message: "Product has been deleted" });
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { listProductsWholesaleEN, createProductWholesaleEN, readProductWholesaleEN, updateProductWholesaleEN, deleteProductWholesaleEN };