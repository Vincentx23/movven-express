const router = require('express').Router();
const {newOrder, getUserOrders, getOrderById} = require('../controllers/orders')
const verifyToken = require ('../middlewares/verifyToken')

router.route('/order')
    .post(verifyToken, newOrder)

router.route('/order/:state/:date')
    .get(verifyToken, getUserOrders)

router.route('/order/:code')
    .get(verifyToken,getOrderById)


module.exports = router;