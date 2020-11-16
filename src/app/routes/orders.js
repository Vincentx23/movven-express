const router = require('express').Router();
const {newOrder,getOrders, getUserOrders, upGradeOrderState, getOrderStateById, getOrderById, getAdminOrdersById } = require('../controllers/orders')
const verifyToken = require ('../middlewares/verifyToken');


router.route('/order')
    .post(verifyToken, newOrder)
    .put(verifyToken, upGradeOrderState)

router.route('/orders/:state/:date')
    .get(verifyToken, getOrders)

router.route('/order/:state/:date')
    .get(verifyToken, getUserOrders)

router.route('/order/:id')
    .get(verifyToken,getOrderById)

router.route('/adminOrder/:id')
    .get(verifyToken, getAdminOrdersById)

router.route('/orderState/:id')
    .get(verifyToken, getOrderStateById)
module.exports = router;