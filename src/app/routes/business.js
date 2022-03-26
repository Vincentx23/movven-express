const router = require('express').Router();
const verifyToken = require ('../middlewares/verifyToken');
const {newBusiness, getBusiness, asingBusiness} = require('../controllers/business');

router.route('/business')
    .get(verifyToken, getBusiness)
    .post(verifyToken, newBusiness)
    .put(verifyToken, asingBusiness)


module.exports = router;