const router = require('express').Router();
const {getUsers, getUsersByRole, asingConductorOrder, getUserByIdBusiness} = require('../controllers/users')
const verifyToken = require ('../middlewares/verifyToken');

router.route('/users/:0')
    .get(verifyToken,getUsers)


router.route('/usersRole/:role')
    .get(verifyToken, getUsersByRole)

router.route('/conductor')
    .post(verifyToken,asingConductorOrder )

    
router.route('/user/:userId')
.get(verifyToken, getUserByIdBusiness)

module.exports = router