const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const { listProducts, createProduct, readProduct, updateProduct, deleteProduct } = require('./controllers/productsController.js');
const { listOrders, createOrder, readOrder, updateOrder, deleteOrder } = require('./controllers/orderController.js');
const { signInGet, signInPost, signUpGet, signUpPost, logOutGet, grantAccess, allowIfLogged } = require('./controllers/authController.js');

router.use(express.json());

//router.use(getRole);

router.use( async(req, res, next) => {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            const { userId } = await jwt.verify(token, process.env.JWT_TOKEN, function(err, decoded) {
                if (err) throw err;
                if (decoded) {
                    console.log(decoded)
                    return decoded
                } else {
                    return next({ status: 401, message: 'Please Log In First' });
                };
            });

            res.locals.loggedInUser = await User.findById(userId);
        }
        next();
    } catch(err) {
        console.log(err);
    }
})

router.get('/products', listProducts);
router.get('products/:productid', allowIfLogged, readProduct);
router.post('/products', allowIfLogged, grantAccess('createAny', 'product'), createProduct);
router.put('/products/:productid', allowIfLogged, grantAccess('updateAny', 'product'), createProduct);
router.delete('/products/:productid', allowIfLogged, grantAccess('deleteAny', 'product'), createProduct);

router.get('/orders', allowIfLogged, grantAccess('readAny', 'order'), listOrders);
router.get('/orders/:orderid', allowIfLogged, grantAccess('readAny', 'order'), readOrder);
router.post('/orders', allowIfLogged, grantAccess('createAny', 'order'), createOrder);
router.put('/orders/:orderid', allowIfLogged, grantAccess('updateAny', 'order'), updateOrder);
router.delete('/orders/:orderid', allowIfLogged, grantAccess('deleteAny', 'order'), deleteOrder);

router
    .route('/signin')
    .get(signInGet)
    .post(signInPost);

router
    .route('/signup')
    .get(signUpGet)
    .post(signUpPost)

router
    .route('/logout')
    .get(logOutGet)

module.exports = router;