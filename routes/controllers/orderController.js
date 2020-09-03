const Order = require('../../models/orders.js');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { 
        firstName: '', 
        lastName: '', 
        email: '', 
        address: '', 
        phoneNumber: ''
    };

    if(err.message.includes('order validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

async function listOrders(req, res) {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function createOrder(req, res) {
    const { firstName, lastName, email, address, phoneNumber, products, productswholesale } = req.body;
    try {
        const newOrder = await Order.create({ firstName, lastName, email, address, phoneNumber, products, productswholesale });
        res.status(201).json(newOrder);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(500).json({ errors });
    }
}

async function readOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.orderid);
        if (order == null) {
            return res.status(404).json({ message: "Can't find Order" });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

async function updateOrder(req, res) {
    try {
        const order = await Order.findOneAndUpdate({ _id: req.params.orderid }, req.body, { new: true });
        res.status(200).json(order);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteOrder(req, res) {
    try {
        await Order.findByIdAndDelete({ _id: req.params.orderid });
        res.status(200).json({ message: "Order has been deleted" });
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = { listOrders, createOrder, readOrder, updateOrder, deleteOrder };