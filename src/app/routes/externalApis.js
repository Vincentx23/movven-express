const router = require('express').Router();
const {newOrder, getOrderbyCodeDelivery} = require('../controllers/externalControllers');


router.route('/order')
    .post(newOrder)


router.route('/order/:codeUser/:codeBusiness/:deliveryCode')
    .get(getOrderbyCodeDelivery)





module.exports = router;