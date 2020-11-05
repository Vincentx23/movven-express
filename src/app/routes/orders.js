const router = require('express').Router();
const {newOrder,getOrders, getUserOrders, upGradeOrderState, getOrderById } = require('../controllers/orders')
const verifyToken = require ('../middlewares/verifyToken');


router.route('/order')
    .get(verifyToken, getOrders)
    .post(verifyToken, newOrder)
    .put(verifyToken, upGradeOrderState)

router.route('/order/:state/:date')
    .get(verifyToken, getUserOrders)

router.route('/order/:code')
    .get(verifyToken,getOrderById)


module.exports = router;