const router = require('express').Router();
const {newOrder, getUserOrders} = require('../controllers/orders')
const verifyToken = require ('../middlewares/verifyToken')

router.route('/order')
    .post(verifyToken, newOrder)
    .get(verifyToken, getUserOrders)


module.exports = router;