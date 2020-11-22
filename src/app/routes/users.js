const router = require('express').Router();
const {getUsers, getUsersByRole, asingConductorOrder} = require('../controllers/users')
const verifyToken = require ('../middlewares/verifyToken');

router.route('/users/:0')
    .get(verifyToken,getUsers)


router.route('/usersRole/:role')
    .get(verifyToken, getUsersByRole)

router.route('/conductor')
    .post(verifyToken,asingConductorOrder )
module.exports = router