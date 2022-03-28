const router = require('express').Router();
const {newOrder, getOrderbyCodeDelivery, getOrders} = require('../controllers/externalControllers');


router.route('/order')
    .post(newOrder)


router.route('/order/:codeUser/:codeBusiness/:deliveryCode')
    .get(getOrderbyCodeDelivery)

router.route('/order/:codeUser/:codeBusiness')
    .get(getOrders)



module.exports = router;