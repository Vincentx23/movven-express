const router = require('express').Router();
const {newOrder,getOrders, getUserOrders, upGradeOrderState, getOrderById } = require('../controllers/orders')
const verifyToken = require ('../middlewares/verifyToken');


router.route('/order')
    .post(verifyToken, newOrder)
    .put(verifyToken, upGradeOrderState)

router.route('/orders/:state/:date')
    .get(verifyToken, getOrders)

router.route('/order/:state/:date')
    .get(verifyToken, getUserOrders)

router.route('/order/:code')
    .get(verifyToken,getOrderById)


module.exports = router;