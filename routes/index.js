const express = require('express');
const cors = require('cors');
const router = express.Router();

const { listProducts, createProduct, readProduct, updateProduct, deleteProduct } = require('./controllers/productsController.js');
const { listProductsEN, createProductEN, readProductEN, updateProductEN, deleteProductEN } = require('./controllers/productsControllerEn.js');
const { listProductsWholesale, createProductWholesale, readProductWholesale, updateProductWholesale, deleteProductWholesale } = require('./controllers/productsWholesaleController.js');
const { listProductsWholesaleEN, createProductWholesaleEN, readProductWholesaleEN, updateProductWholesaleEN, deleteProductWholesaleEN } = require('./controllers/productsWholesaleControllerEn.js');
const { listOrders, createOrder, readOrder, updateOrder, deleteOrder } = require('./controllers/orderController.js');

router.use(cors());
router.use(express.json());

router
    .route('/bees-products')
    .get(listProducts)
    .post(createProduct);

router
    .route('/bees-products/:productid')
    .get(readProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router
    .route('/bees-products-en')
    .get(listProductsEN)
    .post(createProductEN);

router
    .route('/bees-products-en/:productenid')
    .get(readProductEN)
    .put(updateProductEN)
    .delete(deleteProductEN);

router
    .route('/bees-products-wholesale')
    .get(listProductsWholesale)
    .post(createProductWholesale);

router
    .route('/bees-products-wholesale/:productswholesaleid')
    .get(readProductWholesale)
    .put(updateProductWholesale)
    .delete(deleteProductWholesale);

router
    .route('/bees-products-wholesale-en')
    .get(listProductsWholesaleEN)
    .post(createProductWholesaleEN);

router
    .route('/bees-products-wholesale-en/:productwholesaleenid')
    .get(readProductWholesaleEN)
    .put(updateProductWholesaleEN)
    .delete(deleteProductWholesaleEN);

router
    .route('/bees-orders')
    .get(listOrders)
    .post(createOrder);

router
    .route('/bees-orders/:orderid')
    .get(readOrder)
    .put(updateOrder)
    .delete(deleteOrder);

module.exports = router;